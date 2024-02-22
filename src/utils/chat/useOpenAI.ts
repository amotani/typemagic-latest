import { useCallback, useEffect, useRef, useState } from "react";
import { Message, Sender } from "../types";
import { convertMessagesToOpenAI } from "../openai/conversion";
import { uuidv4 } from "@firebase/util";
import { log } from "../logging";

export const useOpenAI = (userId: string, onComplete: () => void) => {
  let [isProcessing, setIsProcessing] = useState(false);
  let writingRef = useRef<string>("");
  const controller = useRef<AbortController | undefined>(undefined);

  const chatCompletion = async (
    chatId: string,
    chatMessages: Message[],
    updateAIResponse: (value: string) => void,
    contentIds?: string[]
  ) => {
    setIsProcessing(true);
    writingRef.current = "";
    // Convert messages to OpenAI message format:
    let openAIMessages = convertMessagesToOpenAI(chatMessages);

    controller.current = new AbortController();
    let signal = controller.current.signal;

    log("Chat", { chatId, chatMessages });

    const lastMessage = chatMessages[chatMessages.length - 1];
    let activeAgentId = lastMessage.agentUsed;

    try {
      const response = await fetch("/api/chat/completion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: atob(userId),
          chatId,
          messages: openAIMessages,
          activeAgentId,
          contentIds,
        }),
        signal,
      });

      if (!response.ok) {
        console.log(response);
        alert("Error: " + response.statusText);
        throw new Error(response.statusText);
      }

      const data = response.body;
      if (!data) {
        return;
      }

      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);

        // Update the current response message ref:
        writingRef.current += chunkValue;

        // Update this specific message value in the chat:
        updateAIResponse(writingRef.current);
      }
      endCurrentRequest();
    } catch (e) {
      // Should hit this if the request is aborted.
      console.log("error: ", e);
      endCurrentRequest();
    }
  };

  const endCurrentRequest = () => {
    setIsProcessing(false);
    controller.current = undefined;
    onComplete();
  };

  const abort = useCallback(() => {
    if (controller.current && isProcessing) {
      controller.current.abort();
      endCurrentRequest();
    }
  }, [isProcessing]);

  return {
    isProcessing,
    chatCompletion,
    abort,
  };
};

import { useCallback, useEffect, useRef } from "react";
import { Agent, Message, Sender, UserPlanInfo } from "../types";

import { useOpenAI } from "./useOpenAI";
import { useChat } from "./useChat";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../db";
import { log } from "../logging";
import { useActiveAgent } from "./useActiveAgent";
import { useRecommend } from "./useRecommend";
import { useAgentsUsedInChat } from "./useAgentsUsedInChat";
import {
  getChatTitleRecommendation,
  getMessageSources,
  logAgentChat,
} from "../functions";
import { usePopularAgents } from "../magic/usePopularAgents";
import { getModelForPlan } from "@/pages/api/api-utils/chat-completion";

export const useBrain = (userId: string, userPlan?: UserPlanInfo) => {
  let {
    chat,
    isChatFetching,
    updateMessage,
    startNewChat,
    saveChat,
    tagNotNew,
    submitChat,
    setActiveAgentId,
    setChatTitle,
  } = useChat(userId, () => abort());

  const { activeAgent, setActiveAgent, isActiveAgentFetching } = useActiveAgent(
    chat.activeAgentId
  );

  let { popularAgents } = usePopularAgents(userId);

  let { chatCompletion, abort, isProcessing } = useOpenAI(userId, () => {
    // On complete:
    saveChat();
    // Update user:
    updateDoc(doc(db, "users", userId), {
      lastMessagedAt: new Date(),
    });
  });

  const { agentsUsedInChatMap } = useAgentsUsedInChat(chat.id, chat.messages);

  const {
    recomendedPublicAgents,
    recommendedPrivateAgents,
    recommend,
    isRecommending,
    clearRecommendations,
  } = useRecommend(userId, popularAgents);

  // Get the activeAgent from url if it exists. Only used when navigating to this page from the agent page's "Chat with agent" button.
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const activeAgentId = urlParams.get("activeAgent");

    if (activeAgentId && activeAgentId !== "undefined") {
      setActiveAgentId(activeAgentId);
      const fetch = async () => {
        // Fetch and set the agent:
        const agentData = await getDoc(doc(db, "agents", activeAgentId));
        if (!agentData.exists()) return setActiveAgentId(null);
        setActiveAgent(agentData.data() as Agent);
      };
      fetch();

      // Update the URL to remove the activeAgentId:
      urlParams.delete("activeAgent");
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?${urlParams}`
      );
    }
  }, [location.search]);

  useEffect(() => {
    recommend(chat.id, chat.messages);
  }, []);

  useEffect(() => {
    if (!chat.lastEdited) return; // No need for a new chat:
    recommend(chat.id, chat.messages);
    updateChatTitle(chat.messages);
  }, [chat.messages.length, chat.id]);

  const selectRecommendedAgent = (agent: Agent) => {
    setActiveAgentId(agent.id);
    setActiveAgent(agent);
  };

  const updateChatTitle = async (messages: Message[]) => {
    // userMessage = the message we will use to generate a title.
    if (!chat) return;

    try {
      let out = await getChatTitleRecommendation(userId, messages);

      let title = out || "Untitled Chat";

      // Set it:
      setChatTitle(title);

      // Persist:
      await setDoc(doc(db, "chatPreviews", chat.id), {
        title,
        createdAt: Date.now(),
        userId,
      });

      // Update the chat:
      saveChat();
    } catch (e) {
      console.error(e);
    }
  };

  const submit = useCallback(
    async (value: string) => {
      if (!value) return;

      console.log(
        "Submit() knowledge sources: ",
        activeAgent?.knowledgeSources
      );

      // If another message is being processed, abort it:
      abort();

      // Add the value as a message:
      let { userMessageId, aiMessageId, updatedMessages } = submitChat(value);

      // Update with AI response:
      const updateAIResponse = (value: string) => {
        updateMessage(aiMessageId, { content: value });
      };

      // All messages in updatedMessages except for last (since OpenAI will complete it with the last).
      const chatMessages = updatedMessages.slice(0, -1);
      chatCompletion(
        chat.id,
        chatMessages,
        updateAIResponse,
        activeAgent?.knowledgeSources
      );

      // If this message will use sources, fetch what the sources are:
      if (activeAgent?.knowledgeSources) {
        let data = await getMessageSources(
          userId,
          activeAgent.id,
          activeAgent.knowledgeSources,
          chatMessages
        );
        if (!data || !data.sources) {
          console.log("No sources found?");
        } else {
          // Update the message with the sources:
          console.log("found sources: ", data.sources);
          updateMessage(aiMessageId, { sources: data.sources });
        }
      }

      // Log the chat for the agent:
      const lastMessage = chatMessages[chatMessages.length - 1];
      let activeAgentId = lastMessage.agentUsed;
      const model = userPlan ? getModelForPlan(userPlan) : "";
      if (activeAgentId)
        logAgentChat(activeAgentId, chat.id, chat.title, model);
    },
    [chat, isProcessing, activeAgent]
  );

  const onNewChatSubmit = (prompt: string, agent?: Agent) => {
    if (agent) {
      selectRecommendedAgent(agent);
    } else {
      tagNotNew();
    }
    submit(prompt);
  };

  const endOfChatMessage = ():
    | { agent: Agent; message: string }
    | undefined => {
    if (
      activeAgent &&
      activeAgent.id !== chat.messages[chat.messages.length - 1].agentUsed
    ) {
      return {
        message: `You're now chatting with agent: ${activeAgent.name}.`,
        agent: activeAgent,
      };
    }
  };

  return {
    chat,
    isChatFetching,
    submit,
    isProcessing,

    startNewChat: () => {
      startNewChat();
      clearRecommendations();
      log("New chat");
    },
    abort,
    activeAgent,
    isActiveAgentFetching,
    setActiveAgentId,

    selectRecommendedAgent,
    recomendedPublicAgents,
    recommendedPrivateAgents,

    isRecommending,

    agentsUsedInChatMap,

    onNewChatSubmit,
    endOfChatMessage: endOfChatMessage(),
    popularAgents,
  };
};

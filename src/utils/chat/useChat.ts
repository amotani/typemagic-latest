import { useCallback, useEffect, useRef, useState } from "react";
import { Chat, Message, Sender } from "../types";
import { createNewId } from "..";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../db";
import { getChatTitleRecommendation } from "../functions";
import { uuidv4 } from "@firebase/util";
import { log } from "../logging";
import { useActiveAgent } from "./useActiveAgent";

const getNewChat = (userId: string): Chat => {
  return {
    id: createNewId(),
    title: "New chat",
    userId: userId,
    lastEdited: null,
    messages: [
      {
        id: "initial_message",
        chatId: "",
        content:
          "Welcome to typemagic! A place to chat with ChatGPT agents. When no agent is active, you're chatting with vanilla ChatGPT.",
        createdAt: new Date(),
        sender: Sender.AI,
      },
    ],
    activeAgentId: null,
  };
};

export const useChat = (userId: string, abort: () => void) => {
  let [chat, setChat] = useState<Chat>(getNewChat(userId));
  let [isChatFetching, setIsChatFetching] = useState(true);

  let chatRef = useRef<Chat>(chat);

  const isNew = !chat.lastEdited;

  useEffect(() => {
    setChatFromURL();
  }, []);

  useEffect(() => {
    setChatFromURL();

    // Logging:
    const urlParams = new URLSearchParams(window.location.search);
    const chatId = urlParams.get("id");
    log("Chat page", { id: chatId });
  }, [location.search]);

  useEffect(() => {
    if (!isChatFetching) setURLFromChat();
  }, [chat.id, isNew]);

  useEffect(() => {
    chatRef.current = chat;
  }, [chat]);

  const setMessages = useCallback(
    (messages: Message[]) => {
      if (!chat) return;
      const updatedChat = { ...chatRef.current, messages };
      setChat(updatedChat);
      chatRef.current = updatedChat;
    },
    [chat]
  );

  const updateMessage = useCallback(
    (messageId: string, messageFields: { [key: string]: any }) => {
      setMessages(
        chatRef.current.messages.map((message) => {
          // Don't handle action message:
          if (message.id === messageId) {
            return {
              ...message,
              ...messageFields,
            };
          }
          return message;
        })
      );
    },
    [chat]
  );

  const setChatTitle = useCallback(
    (title: string) => {
      if (!chat) return;
      setChat({ ...chatRef.current, title });
    },
    [chat]
  );

  const navigate = useNavigate();

  const startNewChat = () => {
    setChat(getNewChat(userId));
    abort();
  };

  const setChatFromURL = async () => {
    // If there is a chatId, fetch the chat:
    setIsChatFetching(true);

    // Get the chatId from the url:
    const urlParams = new URLSearchParams(window.location.search);
    const chatId = urlParams.get("id");

    if (chatId && chatId === chat?.id) return setIsChatFetching(false);

    // If there is no chatId, start a new chat:
    if (!chatId) {
      startNewChat();
      return setIsChatFetching(false);
    }

    let chatDoc = await getDoc(doc(db, "chats", chatId));
    let chatData = chatDoc.data();

    if (!chatDoc.exists || !chatData) {
      startNewChat(); // Just kickstart a new chat. (this will also update the url.)
      return setIsChatFetching(false);
    }

    let chatToSet = { id: chatDoc.id, ...chatData } as Chat;
    setChat(chatToSet);
    setIsChatFetching(false);
  };

  const setURLFromChat = useCallback(() => {
    // When the chatId changes, set the url to the chatId:
    let destination = "/chat";
    if (!isNew) {
      destination += `?id=${chat.id}`;
    }
    const path = window.location.pathname; // Returns "/john-wick-the-second"
    const search = window.location.search; // Returns "?flow=action__some_action"
    const currentUrl = path + search;

    // Don't navigate if we're already on the right page:
    if (destination === currentUrl) return;

    // Navigate to this url:
    navigate(destination);
  }, [chat]);

  const tagNotNew = () => {
    if (!chat) return;
    let updatedChat = { ...chat, lastEdited: new Date() };
    setChat(updatedChat);
    chatRef.current = updatedChat;
  };

  const saveChat = useCallback(async () => {
    let chat = chatRef.current;
    let updatedChat = { ...chat, lastEdited: new Date() };
    setChat(updatedChat);
    chatRef.current = updatedChat;
    await setDoc(doc(db, "chats", chat.id), updatedChat);
    return true;
  }, [chat]);

  const submitChat = (
    value: string
  ): {
    userMessageId: string;
    aiMessageId: string;
    updatedMessages: Message[];
  } => {
    let chatId = chatRef.current.id;
    const messageId = uuidv4();
    let aid = uuidv4();

    const agent = chatRef.current.activeAgentId || "";

    let userMessage: Message = {
      id: messageId,
      chatId,
      sender: Sender.User,
      content: value,
      agentUsed: agent,
      createdAt: new Date(),
    };

    let aiMessage: Message = {
      id: aid,
      chatId,
      sender: Sender.AI,
      content: "",
      agentUsed: agent,
      createdAt: new Date(),
    };

    let updatedMessages = [...chatRef.current.messages, userMessage, aiMessage];

    setMessages(updatedMessages);

    return { userMessageId: messageId, aiMessageId: aid, updatedMessages };
  };

  const setActiveAgentId = (agentId: string | null) => {
    if (!chatRef.current) return;
    let updated = { ...chatRef.current, activeAgentId: agentId };
    setChat(updated);
    chatRef.current = updated; // So that we can immediately call saveChat() - which uses chatRef.current.
    saveChat();
  };

  return {
    chat,
    isChatFetching,
    updateMessage,
    setMessages,
    setChatTitle,
    startNewChat,
    saveChat,
    tagNotNew,
    submitChat,
    setActiveAgentId,
  };
};

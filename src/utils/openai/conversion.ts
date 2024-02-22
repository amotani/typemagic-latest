import { Message, Sender } from "../types";

export const convertMessage = (message: Message): any => {
  // Regular message (AI / user)
  return {
    //@ts-ignore
    role: message.sender === Sender.User ? "user" : "assistant",
    content: message.content,
  };
};

export const convertMessagesToOpenAI = (messages: Message[]): any[] => {
  return messages.map((message) => convertMessage(message));
};

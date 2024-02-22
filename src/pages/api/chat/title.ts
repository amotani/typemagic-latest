import { constants } from "@/styles/constants";
import { Message, Sender } from "@/utils/types";
import { kv } from "@vercel/kv";

import { NextRequest } from "next/server";

const constructPrompt = (messages: Message[]): string => {
  let messagesPrompt = "";
  messages.forEach((message) => {
    messagesPrompt += `${
      message.sender === Sender.AI ? "Assistant" : "User"
    }: ${message.content}\n\n`;
  });

  return `Take the following chat messages between the user and an AI assistant and construct a title for the chat. The title should be a short phrase that describes the chat. IT should NOT BE LONGER THAN ${constants.chatTitleMaxLength} characters. Your response should not contain quotes or any other special characters / markdown formatting. Just plain text.

  Please DO NOT Exceed the ${constants.chatTitleMaxLength} character limit.

-----------------------
MESSAGES:

${messagesPrompt}
-----------------------
`;
};

export const config = {
  runtime: "edge",
};

const handler = async (req: NextRequest): Promise<Response> => {
  let { idToken, messages } = (await req.json()) as {
    idToken: string;
    messages: Message[];
  };

  if (!idToken || !messages) {
    return new Response("Params yo!", { status: 400 });
  }

  if (messages.length === 1)
    return new Response(
      JSON.stringify({ title: "A new chat with Typemagic" }),
      {
        status: 200,
      }
    );

  let message = {
    role: "user",
    content: constructPrompt(messages),
  };

  const payload = {
    model: "gpt-3.5-turbo",
    messages: [message],
  };

  const resp = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!resp.ok) {
    console.log("Error getChatTitle: ", resp);
    throw new Error(resp.statusText);
  }

  const data = await resp.json();

  let { choices } = data;
  let text = choices[0].message.content;

  return new Response(JSON.stringify({ title: text }), { status: 200 });
};

export default handler;

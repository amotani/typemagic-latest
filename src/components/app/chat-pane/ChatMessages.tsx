import { Agent, Chat, Sender, User } from "@/utils/types";
import { styled } from "@stitches/react";
import { ChatMessage } from "./message";
import { constants } from "@/styles/constants";
import { LoadingSpinner } from "@/components/base/LoadingSpinner";
import React, { Fragment } from "react";
import { Caption } from "@/components/base/Text";

export const ChatMessages = (props: {
  user: User | undefined;
  chat: Chat;
  isProcessing: boolean;
  isChatFetching: boolean;
  agentsUsedInChatMap: { [key: string]: Agent };
  endOfChatMessage: { agent: Agent; message: string } | undefined;
}) => {
  const endMessage = () => {
    if (props.endOfChatMessage) {
      let { agent, message } = props.endOfChatMessage;

      // Get the first 150 characters of agent.description to use as content:
      let content = agent.description;
      if (content.length > constants.agentInitialMessageMaxLength)
        content =
          content.slice(0, constants.agentInitialMessageMaxLength) +
          `... [more](/agent/${agent.humanReadableId})`;

      return (
        <React.Fragment>
          <Caption>{message}</Caption>
          <ChatMessage
            key={"poop"}
            message={{
              id: "poop",
              sender: Sender.AI,
              content,
              agentUsed: agent.id,
              createdAt: new Date(),
              chatId: "",
            }}
            isProcessing={false}
            agentUsed={agent}
          />
        </React.Fragment>
      );
    }
  };

  return (
    <Fragment>
      {props.isChatFetching && (
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      )}
      <MessagesContainer>
        {!props.isChatFetching &&
          props.chat.messages.map((message, i) => {
            // Get the agent for this message, if the agent is used:
            let agentUsed = undefined;
            if (
              message.agentUsed &&
              props.agentsUsedInChatMap[message.agentUsed]
            )
              agentUsed = props.agentsUsedInChatMap[message.agentUsed];

            return (
              <ChatMessageContainer>
                <ChatMessage
                  key={i}
                  message={message}
                  isProcessing={
                    i === props.chat.messages.length - 1 &&
                    props.isProcessing &&
                    message.sender === Sender.AI
                  }
                  agentUsed={agentUsed}
                />
              </ChatMessageContainer>
            );
          })}
        {props.endOfChatMessage && endMessage()}
      </MessagesContainer>
    </Fragment>
  );
};

const MessagesContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 16,
  padding: "16px 0px",
  paddingBottom: 400,
  width: "100%",
  maxWidth: constants.chatPaneWidth,
});

const ChatMessageContainer = styled("div", {
  width: "100%",
});

const LoadingContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  width: "100%",
  paddingTop: 90,
});

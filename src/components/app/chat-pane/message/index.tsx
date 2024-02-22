import { styled } from "@stitches/react";
import { hexToRGBA, styles } from "@/styles";
import { Body } from "@/components/base/Text";
import { Markdown } from "@/components/base/Markdown";
import { LoadingSpinner } from "@/components/base/LoadingSpinner";
import { Agent, Message, Sender } from "@/utils/types";
import { MessageHeader } from "./MessageHeader";
import { MessageSources } from "./MessageSources";

export const ChatMessage = (props: {
  message: Message;
  isProcessing: boolean;
  agentUsed?: Agent;
}) => {
  let { message, isProcessing } = props;

  const isAgent = message.sender === Sender.AI;

  // const sources = [
  //   { id: "poop_123", title: "Some source 1", url: "https://www.google.com" },
  //   { id: "poop_122", title: "Some source 2", url: "https://www.facebook.com" },
  //   { id: "poop", title: "Some poop", url: "https://www.naval.com" },
  // ];
  const sources = props.message.sources;

  const getAgentHeader = () => {
    if (isAgent)
      return (
        <MessageHeader
          isTypemagic={!message.agentUsed}
          agent={props.agentUsed}
        />
      );

    return null;
  };

  return (
    <MessageContainer
      isAgent={isAgent}
      key={message.id}
      isActiveAgent={
        props.message.sender === Sender.AI && props.message.agentUsed
          ? true
          : false
      }
    >
      <MessageContent>
        {getAgentHeader()}
        <Body>
          <Markdown content={message.content}></Markdown>
        </Body>
        {isProcessing && <LoadingSpinner />}
      </MessageContent>
      {sources && sources.length > 0 && <MessageSources sources={sources} />}
    </MessageContainer>
  );
};

export const MessageContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 16,
  borderRadius: 4,
  height: "100%",
  width: "100%",
  variants: {
    isAgent: {
      true: {
        background: styles.aiMessageBg,
        border: styles.border,
      },
      false: {
        background: "transparent",
      },
    },
    isActiveAgent: {
      true: {
        border: "solid 1px " + hexToRGBA(styles.agentTextColor, 0.2),
      },
    },
  },
});

export const MessageContent = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 8,
  flexGrow: 1,
  padding: 16,
  width: "100%",
});

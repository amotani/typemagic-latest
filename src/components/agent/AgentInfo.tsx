import { A, Body, Title } from "../base/Text";
import { Markdown } from "../base/Markdown";
import { Agent, Message, Sender, User } from "@/utils/types";
import { styled } from "@stitches/react";
import { styles } from "@/styles";
import { TypemagicSymbol } from "@/icons";
import { MinimalButton } from "../base/MinimalButton";
import { useUserSocial } from "@/utils/auth/useUserSocial";
import { AgentSocial } from "../manage/agents/info/AgentSocial";
import { Avatar } from "../base/Avatar";
import { useEffect, useState } from "react";
import YouTubeEmbed from "./YoutubeEmbed";
import { constants } from "@/styles/constants";
import { ChatMessage } from "../app/chat-pane/message";
import { inter, protoMono } from "@/fonts";
import { isPropertySignature } from "typescript";
import { createNewId } from "@/utils";
import Link from "next/link";

export const AgentInfo = (props: { agent: Agent; userId: string | null }) => {
  const isSignedIn = props.userId !== null;
  let [isMobile, setIsMobile] = useState(false);

  let { toggleLike, doesUserLikeAgent } = useUserSocial(
    props.userId ? props.userId : undefined
  );

  useEffect(() => {
    setIsMobile(window.innerWidth < 600);
  }, []);

  const highlights = () => {
    if (props.agent.highlights) {
      return (
        <Section>
          <Label>Highlights</Label>
          {props.agent.highlights.map((highlight) => (
            <Highlight agent={props.agent} highlight={highlight} />
          ))}
        </Section>
      );
    }
  };

  const video = () => {
    if (props.agent.video) {
      let width;
      // IF mobile, width is screenwidth - 32px padding, else it's 680px
      if (isMobile) {
        width = window.innerWidth - 60;
      } else {
        width = constants.agentPageContentWidth - 48;
      }

      return (
        <Section>
          <YouTubeEmbed src={props.agent.video} width={width} />
        </Section>
      );
    }
  };

  return (
    <AgentContainer>
      <Section>
        <Link href="/">
          <SymbolSpan>
            <TypemagicSymbol />
          </SymbolSpan>
        </Link>
      </Section>
      <Section>
        <AgentName
          className={protoMono.className}
          isMobile={isMobile}
          css={{ lineHeight: "120%" }}
        >
          <span style={{ fontSize: isMobile ? 24 : 32 }}>🤖</span>
          {props.agent.name}
        </AgentName>
        <MinimalButton
          onClick={() => window.open(`/user/${props.agent.creatorHandle}`)}
          hugContent
          noBorder
          isNarrow
        >
          {props.agent.creatorPicture && (
            <Avatar width={24} src={props.agent.creatorPicture} />
          )}
          <span className={inter.className}>{props.agent.creatorHandle}</span>
        </MinimalButton>
        <AgentSocial
          likes={props.agent.likes}
          chats={props.agent.chats}
          onLikeClick={() => toggleLike(props.agent.id)}
          doesUserLike={doesUserLikeAgent(props.agent.id)}
        />
      </Section>
      <Section>
        <Label>About</Label>
        <Body>
          <Markdown content={props.agent.description} />
        </Body>
      </Section>
      {video()}
      {highlights()}
    </AgentContainer>
  );
};

const AgentName = styled("h1", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 16,
  fontSize: 32,
  fontWeight: 600,
  letterSpacing: -2,
  lineHeight: 1,

  variants: {
    isMobile: {
      true: {
        fontSize: 24,
        flexDirection: "column",
        alignItems: "flex-start",
      },
      false: {},
    },
  },
});

const Section = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: 12,
});

const SymbolSpan = styled("span", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
});

const Label = (props: { children: any }) => (
  <span
    className={protoMono.className}
    style={{
      paddingLeft: "0px",
      display: "flex",
      flexDirection: "row",
      fontSize: 13,
      gap: "4px",
      fontWeight: 500,
      letterSpacing: -0.1,
      color: "rgba(0, 0, 0, 0.8)",
    }}
  >
    {props.children}
  </span>
);

export const AgentContainer = styled("div", {
  display: "flex",
  position: "relative",
  flexDirection: "column",
  padding: 24,
  gap: 32,
  alignItems: "flex-start",
  background: "white",
  border: styles.border,
  borderRadius: 4,
  width: "100%",
  maxWidth: constants.agentPageContentWidth,
});

const Highlight = (props: {
  agent: Agent;
  highlight: {
    user: string;
    agent: string;
    sources?: { name: string; url: string }[];
  };
}) => {
  const userMessage: Message = {
    id: "pop",
    sender: Sender.User,
    content: props.highlight.user,
    createdAt: new Date(),
    chatId: "",
  };

  const agentMessage: Message = {
    id: "pop",
    sender: Sender.AI,
    content: props.highlight.agent,
    createdAt: new Date(),
    chatId: "",
    sources: props.highlight.sources?.map((source) => ({
      id: createNewId(),
      title: source.name,
      url: source.url,
    })),
  };

  return (
    <HighlightContainer>
      <span style={{ color: "rgba(0, 0, 0, 0.8)" }}>
        {props.highlight.user}
      </span>
      <ChatMessage
        message={agentMessage}
        isProcessing={false}
        agentUsed={props.agent}
      />
    </HighlightContainer>
  );
};

const HighlightContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",

  gap: 16,
  padding: 16,
  border: styles.border,
  borderRadius: 4,
});

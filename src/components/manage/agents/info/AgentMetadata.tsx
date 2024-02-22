import { MinimalButton } from "@/components/base/MinimalButton";
import { A, Body, Caption } from "@/components/base/Text";
import { Chat, Globe, Heart } from "@/icons";
import { Lock } from "@/icons";
import { styles } from "@/styles";
import { updateAgentIsPublic } from "@/utils/functions";
import { Agent, User } from "@/utils/types";
import { styled } from "@stitches/react";
import { useEffect, useState } from "react";
import { AgentSocial } from "./AgentSocial";
import { protoMono } from "@/fonts";

export const AgentMetadata = (props: {
  agent: Agent;
  doesUserLike?: boolean;
  onLikeClick?: () => void;
}) => {
  return (
    <Container>
      <AccessSpan className={protoMono.className}>
        {props.agent.isPublic ? <Globe /> : <Lock />}
        {props.agent.isPublic ? "Public" : "Private"}
      </AccessSpan>
      <NameSpan className={protoMono.className}>
        <Name>{props.agent.name}</Name>
      </NameSpan>
      {props.agent.humanReadableId && props.agent.isPublic && (
        <ShareLink humanReadableId={props.agent.humanReadableId} />
      )}
      <NameSpan className={protoMono.className}>
        <AgentSocial
          likes={props.agent.likes}
          chats={props.agent.chats}
          onChatClick={() =>
            window.open(`/agent/${props.agent.humanReadableId}/chats`)
          }
        />
        <Access id={props.agent.id} isPublic={props.agent.isPublic} />
      </NameSpan>
      <MinimalButton
        label="View agent's chats"
        hugContent
        onClick={() =>
          window.open(`/agent/${props.agent.humanReadableId}/chats`)
        }
      />
    </Container>
  );
};

const AccessSpan = styled("span", {
  display: "flex",
  flexDirection: "row",
  gap: 4,
  alignItems: "center",
  color: "rgba(0, 0, 0, 0.35)",
  fontSize: 12,
});

const NameSpan = styled("span", {
  display: "flex",
  flexDirection: "row",
  gap: 16,
  alignItems: "center",
});

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 16,
});

const ShareLink = (props: { humanReadableId: string }) => {
  return (
    <div
      className={protoMono.className}
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 4,
        alignItems: "center",
        fontSize: 12,
      }}
    >
      <A
        style={{ color: "rgba(0, 0, 0, 0.35)" }}
        onClick={() => window.open(`/agent/${props.humanReadableId}`)}
      >{`https://typemagic.com/agent/${props.humanReadableId}`}</A>
    </div>
  );
};

const Access = (props: { id: string; isPublic: boolean }) => {
  const buttonLabel = "Make " + (props.isPublic ? "private" : "public");
  const bgColor = props.isPublic ? "#EFDFD6" : "#C3FFD8";

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [props.isPublic]);

  const onClick = async () => {
    setIsLoading(true);
    await updateAgentIsPublic(props.id, !props.isPublic);
    setIsLoading(false);
  };

  return (
    <MinimalButton
      onClick={onClick}
      isLoading={isLoading}
      label={buttonLabel}
      bgColor={bgColor}
      hugContent
    />
  );
};

const Name = styled("span", {
  fontSize: 24,
  fontWeight: 500,
  letterSpacing: -0.1,
  color: styles.agentTextColor,
});

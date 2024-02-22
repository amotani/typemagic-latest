import { Avatar } from "@/components/base/Avatar";
import { Markdown } from "@/components/base/Markdown";
import { MinimalButton } from "@/components/base/MinimalButton";
import { A, Body, Title } from "@/components/base/Text";
import { AgentSocial } from "@/components/manage/agents/info/AgentSocial";
import { inter, protoMono } from "@/fonts";
import { styles } from "@/styles";
import { Agent } from "@/utils/types";
import { styled } from "@stitches/react";

export const AgentGridItem = (props: { agent: Agent; onClick: () => void }) => {
  // Truncate agent description to at most 300 characters. If trunacted, add ellipsis.
  let description = props.agent.description;
  if (description.length > 240) {
    description = description.slice(0, 240) + "...";
  }

  return (
    <Container>
      <Content>
        <A onClick={() => window.open(`/agent/${props.agent.humanReadableId}`)}>
          <AgentName className={protoMono.className}>
            {props.agent.name}
          </AgentName>
        </A>
        <UserRow>
          <Avatar
            width={24}
            src={props.agent.creatorPicture}
            onClick={() => window.open(`/user/${props.agent.creatorHandle}`)}
          />
          <A onClick={() => window.open(`/user/${props.agent.creatorHandle}`)}>
            {" "}
            <span
              className={inter.className}
              style={{ color: "rgba(0, 0, 0, 0.5)" }}
            >
              {props.agent.creatorHandle}
            </span>
          </A>
        </UserRow>
        <AgentSocial likes={props.agent.likes} chats={props.agent.chats} />
        <span
          style={{ color: "rgba(0, 0, 0, 0.6)", lineHeight: "22px" }}
          className={inter.className}
        >
          <span>{description}</span>
        </span>
      </Content>
      <MinimalButton label="Chat" onClick={props.onClick} isBlack />
    </Container>
  );
};

const UserRow = styled("div", {
  display: "flex",
  gap: 8,
  alignItems: "center",
});

const AgentName = styled("span", {
  fontSize: 13,
  color: styles.agentTextColor,
});

const Container = styled("div", {
  background: "rgba(0, 0, 0, 0.02)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: 16,
  width: 300,
  height: "wrap-content",
  maxHeight: 500,
  padding: 16,
  borderRadius: 4,
  border: styles.border,
});

const Content = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 16,
});

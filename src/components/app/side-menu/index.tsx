import { Caption, SubHeader } from "@/components/base/Text";
import { styles } from "@/styles";
import { Agent, User, UserPlanInfo } from "@/utils/types";
import { styled } from "@stitches/react";
import { MinimalButton } from "@/components/base/MinimalButton";

import { constants } from "@/styles/constants";
import Image from "next/image";
import { LoadingSpinner } from "@/components/base/LoadingSpinner";
import { AgentPill } from "./AgentPill";
import { Magnifying, TypemagicSymbol } from "@/icons";
import { Fragment, useCallback } from "react";
import { Avatar } from "@/components/base/Avatar";
import { inter } from "@/fonts";

export const SideMenu = (props: {
  user?: User;
  userPlanInfo?: UserPlanInfo;
  isActiveAgentFetching: boolean;
  activeAgent: Agent | null;
  clearActiveAgent: () => void;

  recommendedPublicAgents: Agent[];
  recommendedPrivateAgents: Agent[];
  selectRecommendedAgent: (agent: Agent) => void;
  isRecommending: boolean;

  doesUserLikeActiveAgent: boolean;
  toggleLike: () => void;

  onSearchButtonClick: () => void;
  onUserButtonClick: () => void;

  startNewChat: () => void;
}) => {
  const recommendedSection = useCallback(
    (isPublic: boolean) => {
      let agents = isPublic
        ? props.recommendedPublicAgents
        : props.recommendedPrivateAgents;

      if (agents.length > 0) {
        return (
          <Fragment>
            <SubHeader>{isPublic ? "Try" : "Your agents"}</SubHeader>
            {agents.map(
              (agent) =>
                agent.id !== props.activeAgent?.id && (
                  <AgentPill
                    agent={agent}
                    onClick={() => props.selectRecommendedAgent(agent)}
                    isNameNotClickable
                    showDescriptionOnHover
                  />
                )
            )}
          </Fragment>
        );
      }
    },
    [
      props.recommendedPublicAgents,
      props.recommendedPrivateAgents,
      props.activeAgent,
    ]
  );

  return (
    <Container>
      <Top>
        <UserProfileContainer>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{ cursor: "pointer", marginBottom: -5 }}
              onClick={props.startNewChat}
            >
              <TypemagicSymbol />
            </span>
            <MinimalButton
              onClick={props.onUserButtonClick}
              hugContent
              isNarrow
              noBorder
            >
              <span
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Avatar width={20} src={props.user?.picture} />
                <UserName className={inter.className}>
                  {props.user?.handle}
                </UserName>
              </span>
            </MinimalButton>
          </div>
        </UserProfileContainer>
        <SectionContainer>
          <MinimalButton onClick={props.onSearchButtonClick} hugContent>
            <Magnifying />
          </MinimalButton>
        </SectionContainer>
        <SectionContainer>
          <SubHeader>Active</SubHeader>
          {props.activeAgent && (
            <AgentPill
              agent={props.activeAgent}
              onRemove={props.clearActiveAgent}
              isActive
              like={props.doesUserLikeActiveAgent}
              onLikeClick={props.toggleLike}
              showOptions
            />
          )}
        </SectionContainer>
        <SectionContainer>
          {recommendedSection(false)}
          {recommendedSection(true)}
          {props.isRecommending && <LoadingSpinner />}
        </SectionContainer>
      </Top>
      <Bottom>
        <MinimalButton
          label="My agents"
          onClick={() => window.open("/manage/agents")}
        >
          <span style={{ fontSize: 16 }}>🤖</span>
        </MinimalButton>
        <Discord />
      </Bottom>
    </Container>
  );
};

const Discord = () => (
  <MinimalButton
    onClick={() => window.open("https://discord.gg/BcG5featTa")}
    hugContent
    noBorder
  >
    <Image src="/discord.png" width={16} height={-1} alt="Discord" />
  </MinimalButton>
);

const UserName = styled("span", {
  fontSize: 13,
  whiteSpace: "nowrap",
});

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
  width: "100%",
});

const Top = styled("div", {});

const Bottom = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: 8,
  padding: 16,
});

const UserProfileContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  padding: 16,
  borderBottom: styles.border,
  height: 50,
});

const SectionContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  padding: 16,
  gap: 8,
});

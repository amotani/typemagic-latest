import { Agent } from "@/utils/types";
import { styles } from "@/styles";
import { styled } from "@stitches/react";
import { useState } from "react";
import { MinimalButton } from "@/components/base/MinimalButton";
import { Cross, Heart, X } from "@/icons";
import { Avatar } from "@/components/base/Avatar";
import { Body, Caption } from "@/components/base/Text";
import { constants } from "@/styles/constants";
import { AgentInfo } from "@/components/agent/AgentInfo";
import { SearchInfoPane } from "@/components/search/SearchInfoPane";
import { formatLikes } from "@/utils";
import { protoMono } from "@/fonts";

type AgentPillProps = {
  agent: Agent;

  isActive?: boolean;
  onRemove?: () => void;
  onClick?: () => void; // Used only for internal tooling - to route to a different context page.

  like?: boolean;
  onLikeClick?: () => void;
  showOptions?: boolean;
  isNameNotClickable?: boolean;
  showDescriptionOnHover?: boolean;
};

export const AgentRobot = <span style={{ fontSize: 16 }}>🤖</span>;

export const AgentPill = (props: AgentPillProps) => {
  let [hovered, setHovered] = useState(false);

  const heart = () => {
    if (props.like !== undefined && props.onLikeClick !== undefined) {
      return (
        <MinimalButton onClick={props.onLikeClick} noBorder isNarrow hugContent>
          <Heart isActive={props.like} />
        </MinimalButton>
      );
    }
  };

  return (
    <Container
      onClick={props.onClick}
      isActive={props.isActive ? true : false}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 4,
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
          padding: "8px 12px",
        }}
      >
        <InfoRow>
          <Handle isActive={props.isActive ? true : false}>
            <Avatar
              width={24}
              src={props.agent.creatorPicture}
              onClick={() => window.open(`/user/${props.agent.creatorHandle}`)}
            />
          </Handle>
          <Slash>/</Slash>
          <AgentName
            className={protoMono.className}
            isUnderline={props.isNameNotClickable ? false : true}
            onClick={() =>
              !props.isNameNotClickable &&
              window.open(`/agent/${props.agent.humanReadableId}`)
            }
          >
            {props.agent.name}
          </AgentName>
        </InfoRow>
        {!props.showOptions && (
          <LikeCount className={protoMono.className}>
            {" "}
            {formatLikes(props.agent.likes)}
          </LikeCount>
        )}
      </div>
      {props.showOptions && (
        <OptionsRow>
          <LikeCount className={protoMono.className}>
            {formatLikes(props.agent.likes)}
          </LikeCount>
          {heart()}
          {props.onRemove && (
            <MinimalButton
              noBorder
              isNarrow
              hugContent
              onClick={props.onRemove}
            >
              <Cross />
            </MinimalButton>
          )}
        </OptionsRow>
      )}
      {props.showDescriptionOnHover && hovered && (
        <div
          style={{
            position: "absolute",
            left: constants.sidePaneWidth + 16,
            zIndex: 999,
            background: "white",
          }}
        >
          <SearchInfoPane agent={props.agent} />
        </div>
      )}
    </Container>
  );
};

const GAP = 4;

export const LikeCount = styled("span", {
  fontSize: 11,
  color: styles.agentTextColor,
});

const InfoRow = styled("span", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});

const OptionsRow = styled("div", {
  display: "flex",
  flexDirection: "row",
  borderTop: styles.border,
  gap: 0,
  justifyContent: "flex-end",
  padding: "2px 8px",
  alignItems: "center",
});

const Container = styled("div", {
  position: "relative",
  borderRadius: 4,
  display: "flex",
  flexDirection: "column",
  gap: 4,

  cursor: "pointer",
  color: "#555555",
  lineHeight: "1.6",
  background: "rgba(0, 0, 0, 0.035)",

  variants: {
    isActive: {
      true: {
        backgroundColor: styles.agentBg,
        border: styles.border,
        color: styles.agentTextColor,
      },
      false: {
        color: "rgba(0, 0, 0,0.4)",
        ["&:hover"]: {
          backgroundColor: "rgba(0, 0, 0, 0.09)",
          color: "black",
        },
      },
    },
  },
});

const Handle = styled("span", {
  color: "rgba(0, 0, 0, 0.4)",
  variants: {
    isActive: {
      true: {
        color: styles.fontColor.primary,
      },
    },
  },
  ...styles.underline,
  marginRight: GAP,
});

const AgentName = styled("span", {
  fontSize: 12,
  letterSpacing: -0.1,

  variants: {
    isUnderline: {
      true: {
        ...styles.underline,
      },
    },
  },
});

export const Slash = styled("span", {
  marginRight: GAP,
  color: "rgba(0, 0, 0, 0.35)",
});

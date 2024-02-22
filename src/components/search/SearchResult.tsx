import { Heart } from "@/icons";
import { styles } from "@/styles";
import { styled } from "@stitches/react";
import { LikeCount, Slash } from "../app/side-menu/AgentPill";
import { Avatar } from "../base/Avatar";
import { formatLikes } from "@/utils";
import { inter, protoMono } from "@/fonts";

export const SearchResult = (props: {
  creatorHandle: string;
  creatorPicture?: string;
  agentName: string;
  likes: number;
  isFocused: boolean;
  onClick: () => void;
}) => {
  return (
    <Container isFocused={props.isFocused} onClick={props.onClick}>
      <Info>
        <Avatar src={props.creatorPicture} width={24} />
        <CreatorHandle className={inter.className}>
          {props.creatorHandle}
        </CreatorHandle>
        <Slash>/</Slash>
        <span
          className={protoMono.className}
          style={{
            fontSize: 13,
            color: "rgba(0, 0, 0, 0.9)",
            fontWeight: 400,
          }}
        >
          {props.agentName}
        </span>
      </Info>
      <Social>
        <LikeCount className={protoMono.className} css={{ color: "black" }}>
          {formatLikes(props.likes)}
        </LikeCount>
        <Heart />
      </Social>
    </Container>
  );
};

export const CreatorHandle = styled("span", {
  fontSize: 14,
  color: "rgba(0, 0, 0, 0.5)",
  ...styles.underline,
});

const Container = styled("div", {
  display: "flex",
  flexDirection: "row",
  padding: "16px 16px",
  justifyContent: "space-between",

  cursor: "pointer",

  ["&:hover"]: {
    background: styles.hoverBackground,
  },

  variants: {
    isFocused: {
      true: {
        backgroundColor: styles.selectedBackground,
      },
    },
  },
});

const Info = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
});

const Social = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: 4,
  alignItems: "center",
});

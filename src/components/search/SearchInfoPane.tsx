import { styles } from "@/styles";
import { Agent } from "@/utils/types";
import { styled } from "@stitches/react";
import { Body } from "../base/Text";
import { CreatorHandle } from "./SearchResult";
import { inter, protoMono } from "@/fonts";
import { Markdown } from "../base/Markdown";

export const SearchInfoPane = (props: { agent: Agent }) => {
  // Truncate description beyond 500 characters:
  let description = props.agent.description;
  if (description.length > 500) {
    description = description.slice(0, 500) + "...";
  }

  return (
    <Container>
      <Body>
        <Markdown content={description}></Markdown>
      </Body>
    </Container>
  );
};

const Name = styled("span", {
  fontSize: 13,
  color: "rgba(0,0, 0, 0.9)",
  fontWeight: 500,
});

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  padding: 16,
  backgroundColor: "white",
  borderRadius: 4,
  border: styles.border,
  width: 300,
  gap: 12,
});

import { A } from "@/components/base/Text";
import { styled } from "@stitches/react";

export const MessageSources = (props: {
  sources: { id: string; title: string; url: string }[];
}) => (
  <Container>
    {props.sources.map((source) => {
      return (
        <A href={source.url} target="_blank">
          <span style={{ marginRight: 8 }}>📕</span>
          {source.title}
        </A>
      );
    })}
  </Container>
);

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 8,
  background: "white",
  padding: 16,
  width: "100%",
});

import { styled } from "@stitches/react";
import { Body } from "../Text";
import { Markdown } from "../Markdown";

export enum MessageType {
  Success,
  Error,
}

export const Message = (props: { message: string; type: MessageType }) => (
  <Container isError={props.type === MessageType.Error}>
    <Markdown content={props.message} />
  </Container>
);

const Container = styled("div", {
  display: "flex",
  flexDirection: "row",
  padding: 16,
  width: "100%",
  borderRadius: 4,

  fontSize: 13,

  variants: {
    isError: {
      true: {
        border: "1px solid #482121",
        color: "#BF8D8D",
      },
      false: {
        border: "1px solid #134E1C",
        color: "#83AF73",
      },
    },
  },
});

import { TypemagicSymbol } from "@/icons";
import { hexToRGBA, styles } from "@/styles";
import { styled } from "@stitches/react";
import { Caption } from "./Text";

export const Callout = (props: { message: string }) => {
  return (
    <Container>
      <TypemagicSymbol />
      <Text>{props.message}</Text>
    </Container>
  );
};

const Text = styled("span", {
  fontSize: 14,
  lineHeight: 1.5,
  color: "rgba(0, 0, 0, 0.65)",
});
const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  padding: 16,
  gap: 4,
  borderRadius: 4,
  border: styles.border,
  background: hexToRGBA(styles.contextBg, 0.5),
});

import { protoMono } from "@/fonts";
import { styles } from "@/styles";
import { styled } from "@stitches/react";

export const AgentListItem = (props: {
  id: string;
  name: string;
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <Container
      className={protoMono.className}
      isSelected={props.isSelected}
      onClick={props.onClick}
    >
      <span>{props.name}</span>
    </Container>
  );
};

const Container = styled("div", {
  color: "rgba(0, 0, 0, 0.4)",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: `12px 16px`,
  cursor: "pointer",

  "&:hover": {
    backgroundColor: styles.hoverBackground,
    color: styles.agentTextColor,
    fontWeight: 500,
  },
  borderRadius: 4,
  variants: {
    isSelected: {
      true: {
        backgroundColor: styles.selectedBackground,
        color: styles.agentTextColor,
        fontWeight: 500,
      },
    },
  },
});

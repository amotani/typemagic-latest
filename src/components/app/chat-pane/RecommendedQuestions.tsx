import { inter } from "@/fonts";
import { styles } from "@/styles";
import { constants } from "@/styles/constants";
import { styled } from "@stitches/react";

export const RecommendedQuestions = (props: {
  recommendedQuestions: string[];
  onSelect: (question: string) => void;
}) => (
  <Container className={inter.className}>
    {props.recommendedQuestions.map((q) => (
      <Question onClick={() => props.onSelect(q)}>{q}</Question>
    ))}
  </Container>
);

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 12,
  width: "100%",
  maxWidth: constants.chatPaneWidth,
  background: "transparent",
});

const Question = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: "8px 16px",
  color: "rgba(0, 0, 0, 0.6)",
  borderRadius: 4,
  cursor: "pointer",
  "&:hover": {
    background: styles.selectedBackground,
    color: "rgba(0, 0, 0, 1)",
  },
  border: styles.border,
});

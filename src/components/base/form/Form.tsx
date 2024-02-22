import { styles } from "@/styles";
import { styled } from "@stitches/react";

export const Title = (props: { label: string; children?: any }) => {
  return (
    <TitleContainer>
      <TitleLabel>{props.label}</TitleLabel>
      {props.children}
    </TitleContainer>
  );
};

export const Form = (props: {
  children: any;
  onSubmit?: (e?: any) => void;
  onDelete?: () => void;
}) => {
  return (
    <Container
      onSubmit={(e: any) => {
        e.preventDefault();
        if (props.onSubmit) props.onSubmit(e);
      }}
    >
      {props.children}
    </Container>
  );
};

const Container = styled("form", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: 24,
});

const TitleContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
  alignItems: "center",
});

const TitleLabel = styled("h2", {
  fontSize: 18,
  fontWeight: 400,
  color: styles.fontColor.primary,
});

import { Profile } from "@/icons";
import { styled } from "@stitches/react";

export const Avatar = (props: {
  src: string | undefined;
  width?: number;
  onClick?: () => void;
}) => {
  let diameter = props.width ? props.width : 24;
  const Image = styled("img", {
    width: diameter,
    height: diameter,
    borderRadius: "50%",
    ["&:hover"]: {
      cursor: "pointer",
      outline: props.onClick && "2px solid rgba(0, 0, 0, 0.25)",
    },
  });

  return (
    <Container style={{}} onClick={props.onClick}>
      {props.src ? (
        <Image width={props.width} src={props.src} />
      ) : (
        <Profile width={props.width} />
      )}
    </Container>
  );
};

const Container = styled("span", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});

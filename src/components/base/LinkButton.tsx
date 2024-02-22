import { protoMono } from "@/fonts";
import { styles } from "@/styles";
import { styled } from "@stitches/react";
import Link from "next/link";

export const LinkButton = (props: {
  label: string;
  href: string;
  isActive: boolean;
  small?: boolean;
  special?: boolean;
}) => {
  return (
    <LinkButtonContainer isActive={props.isActive} special={props.special}>
      <Link
        className={protoMono.className}
        style={{
          padding: "8px 12px",
          background: "transparent",
          fontSize: props.small ? 12 : 14,
        }}
        href={props.href}
      >
        {props.label}
      </Link>
    </LinkButtonContainer>
  );
};

const LinkButtonContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 4,
  padding: 0,

  cursor: "pointer",

  [`&:hover`]: {
    background: styles.hoverBackground,
    color: "black",
  },

  borderRadius: 4,
  border: styles.border,

  variants: {
    isActive: {
      true: {
        fontWeight: 500,
        color: styles.fontColor.primary,
        background: styles.selectedBackground,
      },
      false: {
        color: "rgba(0, 0,0, 0.35)",
        background: "transparent",
      },
    },
    special: {
      true: {
        background: styles.agentTextColor,
        color: "white",
        [`&:hover`]: {
          background: "black",
          color: "white",
        },
      },
    },
  },
});

import { inter, protoMono } from "@/fonts";
import { styles } from "@/styles";
import { styled } from "@stitches/react";

export const Header = styled("span", {
  fontSize: 24,
  fontWeight: 500,
  color: styles.fontColor.primary,
});

export const Title = (props: { children: any }) => (
  <span
    className={protoMono.className}
    style={{
      fontSize: "13px",
      lineHeight: "24px",
      fontWeight: "500",
      color: styles.fontColor.primary,
    }}
  >
    {props.children}
  </span>
);

export const SubHeader = styled("span", {
  fontSize: 12,
  fontWeight: 500,
  color: styles.fontColor.subHeader,
});

export const Caption = (props: { children: any; isError?: boolean }) => (
  <span
    className={inter.className}
    style={{
      fontSize: "12px",
      lineHeight: "16px",
      fontWeight: "400",
      color: props.isError
        ? styles.fontColor.error
        : styles.fontColor.subHeader,
    }}
  >
    {props.children}
  </span>
);

export const Body = (props: { children: any }) => (
  <span
    className={inter.className}
    style={{
      fontSize: "14px",
      lineHeight: "22px",
      fontWeight: "400",
      color: styles.fontColor.secondary,
    }}
  >
    {props.children}
  </span>
);

export const A = styled("a", {
  color: styles.fontColor.caption,
  textDecoration: "none",
  wordWrap: "break-word",
  inlineSize: "100%",
  "&:hover": {
    ...styles.underline,
    color: styles.fontColor.primary,
  },
});

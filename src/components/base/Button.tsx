import { styled } from "@stitches/react";
import { Plus, At } from "@/icons";

import { styles } from "@/styles";
import { Caption } from "./Text";
import { LoadingSpinner } from "./LoadingSpinner";
import { Fragment } from "react";
import { protoMono } from "@/fonts";

export enum ButtonIconType {
  Add = "add",
  At = "at",
}

export const Button = (props: {
  label: string;
  onClick?: () => void;
  size?: "small" | "regular";
  style?: "minimal" | "regular";
  type?: string;
  icon?: ButtonIconType;
  border?: "positive" | "negative" | "neutral";
  width?: string;
  disabled?: boolean;
  disabledLabel?: string;
  description?: string;
  isLoading?: boolean;
  shortcutKeys?: string[];
}) => {
  const getIcon = () => {
    if (props.icon && props.icon === ButtonIconType.Add) {
      return <Plus />;
    }
    if (props.icon && props.icon === ButtonIconType.At) {
      return <At />;
    }
    return null;
  };

  const ContainerComponent =
    props.size === "small" ? Container : RegularContainer;

  const shortcutKeys = () => {
    if (!props.shortcutKeys) return null;
    return (
      <ShortcutKeysContainer>
        {props.shortcutKeys.map((key) => (
          <ShortCutKey>{key}</ShortCutKey>
        ))}
      </ShortcutKeysContainer>
    );
  };

  const label = () => {
    if (props.disabled && props.disabledLabel) {
      return <LabelContainer>{props.disabledLabel}</LabelContainer>;
    }
    return (
      <LabelContainer>
        {props.label}
        {!props.disabled && shortcutKeys()}
      </LabelContainer>
    );
  };

  return (
    <OuterContainer className={protoMono.className}>
      <ContainerComponent
        onClick={props.onClick}
        //@ts-ignore
        border={props.border}
        width={props.width}
        disabled={props.disabled}
      >
        {getIcon()}
        {!props.isLoading ? label() : <LoadingSpinner />}
      </ContainerComponent>
      {props.description && <Caption>{props.description}</Caption>}
    </OuterContainer>
  );
};

const OuterContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  width: "100%",
});

const Container = styled("button", {
  appearance: "none",
  background: "rgba(0, 0, 0, 0.8)",
  fontFamily: "inherit",
  fontSize: "inherit",
  fontVariant: "none",
  margin: 0,
  outline: "none",

  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  padding: "8px 12px",
  gap: "8px",
  justifyContent: "center",
  borderRadius: "4px",
  border: styles.border,
  color: "white",
  variants: {
    border: {
      positive: { borderColor: "#00FF00" },
      negative: { borderColor: "#582B2B" },
      default: { borderColor: styles.primaryStrokeColor },
    },
    disabled: {
      true: {
        color: styles.fontColor.disabled,
        cursor: "not-allowed",
        pointerEvents: "none",
        "&:hover": {
          color: styles.fontColor.disabled,
        },
      },
      false: {
        cursor: "pointer",
        pointerEvents: "auto",
        "&:hover": {
          color: "white",
        },
      },
    },
  },
  compoundVariants: [
    {
      disabled: "true",
      css: {
        backgroundColor: "transparent",
      },
    },
    {
      disabled: "false",
      css: {
        backgroundColor: styles.buttonBg,
        "&:hover": {
          backgroundColor: "black",
        },
      },
    },
  ],
  defaultVariants: {
    disabled: "false",
    border: "default",
  },
});

const RegularContainer = styled(Container, {
  width: "100%",
  padding: "12px 8px",
});

const LabelContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "8px",
});

export const ShortCutKey = styled("span", {
  fontSize: 11,
  color: styles.fontColor.caption,
  padding: 4,
  borderRadius: 4,
  background: "rgba(256, 256, 256, 0.1)",
});

export const ShortcutKeysContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: 2,
});

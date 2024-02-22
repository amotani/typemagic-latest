import { styles } from "@/styles";
import { styled } from "@stitches/react";
import { LoadingSpinner } from "./LoadingSpinner";
import { protoMono } from "@/fonts";

export const MinimalButton = (props: {
  label?: string;
  onClick: () => void;
  isSelected?: boolean;
  children?: any;
  isLoading?: boolean;
  noBorder?: boolean;
  hugContent?: boolean;
  isNarrow?: boolean;
  isDestructive?: boolean;
  isBlack?: boolean;
  shortcutKeys?: string[];
  disabled?: boolean;
  disabledLabel?: string;
  bgColor?: string;
}) => {
  return (
    <Container
      className={protoMono.className}
      noBorder={props.noBorder}
      onClick={(e: any) => {
        // e.stopPropagation();
        // e.preventDefault();
        props.onClick();
      }}
      isSelected={props.isSelected}
      hugContent={props.hugContent ? props.hugContent : false}
      isNarrow={props.isNarrow ? props.isNarrow : false}
      isDestructive={props.isDestructive ? props.isDestructive : false}
      isBlack={props.isBlack && !props.disabled ? props.isBlack : false}
      isCentered={props.children === undefined}
      isSpacedBetweeen={props.shortcutKeys !== undefined}
      disabled={props.disabled}
      css={{
        backgroundColor: props.bgColor,
      }}
    >
      {!props.isLoading && props.children}
      {props.isLoading && <LoadingSpinner />}
      {props.label && (
        <ButtonLabel>
          {props.disabled && props.disabledLabel
            ? props.disabledLabel
            : props.label}
        </ButtonLabel>
      )}
      {!props.isLoading && props.shortcutKeys && (
        <ShortCutKey isBlack={props.isBlack ? props.isBlack : false}>
          {props.shortcutKeys.join(" + ")}
        </ShortCutKey>
      )}
    </Container>
  );
};

export const ButtonLabel = styled("span", {
  fontSize: 12,
});

const Container = styled("button", {
  display: "flex",
  flexDirection: "row",
  gap: 8,
  padding: styles.minimalButtonVerticalPadding + "px 12px",
  width: "100%",
  cursor: "pointer",
  border: styles.border,
  color: "rgba(0, 0, 0,0.4)",
  background: "transparent",
  alignItems: "center",

  fontSize: 13,
  letterSpacing: -0.1,

  ["&:hover"]: {
    backgroundColor: styles.hoverBackground,
    color: styles.fontColor.primary,
    border: styles.border,
  },

  borderRadius: 4,
  justifyContent: "flex-start",

  variants: {
    hugContent: {
      true: {
        width: "fit-content",
      },
      false: {
        width: "100%",
      },
    },
    noBorder: {
      true: {
        border: "1px solid transparent",
      },
      false: {
        border: styles.border,
      },
    },
    isNarrow: {
      true: {
        padding: "3px 6px",
      },
    },
    isSelected: {
      true: {
        background: styles.selectedBackground,
        color: styles.fontColor.primary,
      },
      false: {
        background: "transparent",
        color: styles.fontColor.secondary,
      },
    },
    isDestructive: {
      true: {
        background: "darkred",
        color: "white",
        "&:hover": {
          background: "red",
        },
      },
      false: {},
    },
    disabled: {
      true: {
        opacity: 0.5,
        cursor: "not-allowed",
        "&:hover": {
          background: "transparent",
          color: styles.fontColor.secondary,
        },
      },
    },
    isBlack: {
      true: {
        background: "rgba(0, 0, 0, 0.8)",
        color: "white",
        "&:hover": {
          background: "black",
          color: "white",
        },
      },
    },
    isCentered: {
      true: {
        justifyContent: "center",
      },
    },
    isSpacedBetweeen: {
      true: {
        justifyContent: "space-between",
      },
    },
  },
});

export const ShortCutKey = styled("span", {
  fontSize: 11,
  color: styles.fontColor.caption,
  padding: 4,
  borderRadius: 4,
  background: "rgba(0, 0, 0, 0.1)",

  variants: {
    isBlack: {
      true: {
        background: "rgba(255, 255, 255, 0.1)",
        color: "rgba(255, 255, 255, 0.8)",
      },
    },
  },
});

import React, { useEffect, useRef, useState } from "react";
import { styles } from "@/styles";
import { styled } from "@stitches/react";
import { constants } from "@/styles/constants";
import { LoadingSpinner } from "@/components/base/LoadingSpinner";

const PromptEditor = (props: {
  onSubmit: () => void;

  value: string;
  onChange: (value: string) => void;

  isActive: boolean;
  isVisible: boolean;
  handleGlobalKeyDown: (event: React.KeyboardEvent) => boolean;
  isLoading?: boolean;
  editorRef: React.RefObject<HTMLTextAreaElement>;

  onFocus: () => void;
  onBlur: () => void;
  isFocused: boolean;
}) => {
  let textareaRef = props.editorRef;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.onChange(event.target.value);
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (props.handleGlobalKeyDown(event)) return;
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      props.onSubmit();

      // Clear value in textAreaRef:
      textareaRef.current!.value = "";

      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }

    if (event.key === "Tab") {
      // prevent default behavior (focus leaving textarea)
      event.preventDefault();
      // insert tab character into textarea value

      // @ts-ignore
      const start = event.target.selectionStart;
      // @ts-ignore
      const end = event.target.selectionEnd;

      let val = `${props.value.substring(0, start)}\t${props.value.substring(
        end
      )}`;
      textareaRef.current!.value = val;

      props.onChange(val);
      // move cursor position
      // @ts-ignore
      event.target.selectionStart = event.target.selectionEnd = start + 1;
    }
  };

  return (
    <Container isVisible={props.isVisible}>
      {props.isLoading && <LoadingSpinner />}
      <Textarea
        ref={textareaRef}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={!props.isActive}
        autoFocus={true}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        placeholder={props.isFocused ? "" : "'/' to start typing"}
      />
    </Container>
  );
};

export default PromptEditor;

const Textarea = styled("textarea", {
  width: "100%",
  maxHeight: `${300}px`,
  padding: "16px",
  border: "rgba(255, 255, 255, 0.4) 1px solid",
  borderRadius: 4,
  boxSizing: "border-box",
  resize: "none",
  overflowY: "auto",
  outline: "none",
  fontFamily: "'Inter', sans-serif",
  background: "rgba(0, 0, 0, 0.8)",
  color: "white",
  fontSize: "14px",
  letterSpacing: "0.3px",

  ["&::placeholder"]: {
    color: "rgba(255, 255, 255, 0.5)",
  },
});

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  paddingTop: "0px",
  alignItems: "flex-end",
  gap: 4,
  variants: {
    isVisible: {
      true: {},
      false: {
        display: "none",
      },
    },
  },
  defaultVariants: {
    isVisible: "true",
  },
  maxWidth: constants.chatPaneWidth,
});

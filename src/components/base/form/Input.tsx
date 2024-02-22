import React, { useState } from "react";
import { styled, css } from "@stitches/react";
import { styles } from "@/styles";
import { Caption } from "../Text";
import { protoMono } from "@/fonts";

interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  description?: string;
  placeholder?: string;
  isMultiline?: boolean;
  height?: number | string;
  isSpecialCharactersBanned?: boolean;
  maxLength?: number;
  onKeyDown?: (e: React.KeyboardEvent) => boolean;
  autoFocus?: boolean;
  invalid?: boolean;
  errorMessage?: string;
  invalidMessage?: string;
  onBlur?: () => void;
  onFocus?: () => void;
}

const InputComponent: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  description,
  isMultiline,
  height,
  isSpecialCharactersBanned,
  maxLength,
  autoFocus,
  invalid,
  errorMessage,
  onKeyDown,
  invalidMessage,
  placeholder,
  onBlur,
  onFocus,
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let newValue = e.target.value;

    if (isSpecialCharactersBanned) {
      newValue = newValue.replace(/[^\w\s]/gi, "");
    }

    if (maxLength) {
      newValue = newValue.substring(0, maxLength);
    }

    onChange(newValue);
  };

  return (
    <InputContainer>
      <InputLabel>{label}</InputLabel>
      {isMultiline ? (
        <TextArea
          isValid={invalid ? false : true}
          onKeyDown={onKeyDown}
          value={value}
          onChange={handleInputChange}
          onBlur={onBlur}
          onFocus={onFocus}
          autoFocus={autoFocus}
          placeholder={placeholder}
          css={{
            height: height ? height : 300,
          }}
        />
      ) : (
        <Input
          autoFocus={autoFocus}
          isValid={invalid ? false : true}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          onFocus={onFocus}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
        />
      )}
      <CaptionsContainer>
        {description ? <Caption>{description}</Caption> : null}
        {invalid && <Caption isError={true}>{errorMessage}</Caption>}
      </CaptionsContainer>
    </InputContainer>
  );
};

export default InputComponent;

const InputContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  width: "100%",
});

export const InputLabel = ({ children }: any) => {
  return (
    <span
      style={{
        color: styles.fontColor.primary,
        paddingLeft: "0px",
        display: "flex",
        flexDirection: "row",
        fontSize: 13,
        gap: "4px",
      }}
      className={protoMono.className}
    >
      {children}
    </span>
  );
};

const CaptionsContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

export const commonInputStyles = {
  padding: "12px",
  fontSize: 14,
  border: styles.border,
  borderRadius: "4px",
  color: styles.fontColor.primary,
  outline: "none",
  lineHeight: "21px",
  background: styles.inputBg,
  variants: {
    isValid: {
      true: {},
      false: { border: "1px solid " + styles.fontColor.error },
    },
  },
  "&::placeholder": {
    color: "rgba(0, 0, 0, 0.25)",
  },
};

const Input = styled("input", {
  ...commonInputStyles,
  letterSpacing: "0.3px",
});

const TextArea = styled("textarea", {
  ...commonInputStyles,
  WebkitBoxShadow: "none",
  MozBoxShadow: "none",
  boxShadow: "none",
  resize: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  fontFamily: "inherit",
  fontSize: 14,
});

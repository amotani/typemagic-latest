import React, { useEffect, useRef } from "react";
import { styled } from "@stitches/react";
import { commonInputStyles } from "./Input";

const AutoGrowInput = (props: {
  value: string;
  onChange: (v: string) => void;
  maxHeight?: number;
  placeholder?: string;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { value, onChange, maxHeight } = props;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <TextArea
      ref={textareaRef}
      value={value}
      onChange={handleChange}
      css={{ maxHeight: props.maxHeight || 300 }}
      placeholder={props.placeholder}
    />
  );
};

const TextArea = styled("textarea", {
  width: "100%",
  ...commonInputStyles,
  fontFamily: "'Inter', sans-serif",
  WebkitBoxShadow: "none",
  MozBoxShadow: "none",
  boxShadow: "none",
  resize: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});

export default AutoGrowInput;

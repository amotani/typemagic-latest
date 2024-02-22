import React from "react";
import { styled, keyframes } from "@stitches/react";
import { styles } from "@/styles";

// Create a keyframes animation
const spinnerAnimation = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

const SpinnerElement = styled("div", {
  content: '""',
  boxSizing: "border-box",
  width: "20px",
  height: "20px",
  borderRadius: "50%",
  border: "2px solid " + styles.loadingSpinnerBg,
  borderTopColor: styles.loadingSpinnerFg,
  animation: `${spinnerAnimation} .6s linear infinite`,
});

export const LoadingSpinner = () => <SpinnerElement />;

import React from "react";
import IconButton from "@/components/base/IconButton";
import { Stop } from "@/icons";
import { styles } from "@/styles";
import { styled } from "@stitches/react";
import { MinimalButton } from "../../base/MinimalButton";

const StopExecutionButton = (props: { onClick: () => void }) => {
  return (
    <MinimalButton hugContent label="Stop" onClick={props.onClick}>
      <Stop />
    </MinimalButton>
  );
};

export default StopExecutionButton;

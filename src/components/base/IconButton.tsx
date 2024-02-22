import React, { ReactNode } from "react";
import { styled } from "@stitches/react";

import { CheckMark } from "@/icons";
import { styles } from "@/styles";

interface IconButtonProps {
  children: ReactNode;
  onClick?: () => void;
  showCheckMarkOnClick?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
  children,
  onClick,
  showCheckMarkOnClick,
}) => {
  let [showCheck, setShowCheck] = React.useState(false);

  const handleClick = () => {
    if (onClick) onClick();
    if (showCheckMarkOnClick) {
      setShowCheck(true);

      // Hide checkmark after 3 seconds:
      setTimeout(() => {
        setShowCheck(false);
      }, 3000);
    }
  };

  return (
    <IconButtonWrapper onClick={handleClick}>
      {showCheck ? <CheckMark fill={styles.positive} /> : children}
    </IconButtonWrapper>
  );
};

export default IconButton;

const IconButtonWrapper = styled("button", {
  display: "flex",
  position: "relative",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  padding: "4px",
  backgroundColor: "transparent",
  borderRadius: "50%",
  border: "none",
  transition: "background-color 0.2s ease-in-out, color 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: styles.buttonBg,
    "& svg": {
      fill: "#fff",
    },
  },
  "& svg": {
    transition: "fill 0.2s ease-in-out",
  },
});

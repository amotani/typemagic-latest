import React from "react";
import { styled } from "@stitches/react";
import { styles } from "@/styles";

// Create a full-screen overlay that tints the background
const Overlay = styled("div", {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  display: "flex",
  justifyContent: "center",
  zIndex: 1000,
});

// Create a container for the modal content
const ModalContainer = styled("div", {
  zIndex: 1001,
  maxWidth: 500,
  position: "relative",
  background: styles.landingPageBg,
  borderRadius: 4,
  height: "max-content",
  marginTop: 150,
  border: "1px solid " + styles.primaryStrokeColor,
  boxShadow: "0 16px 70px rgba(0,0,0,.2)",
});

const Modal = (props: { children: any; onClose: () => void }) => {
  const handleClickOutside = (e: any) => {
    props.onClose();
  };

  return (
    <Overlay onClick={handleClickOutside}>
      <ModalContainer onClick={(e: any) => e.stopPropagation()}>
        {props.children}
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;

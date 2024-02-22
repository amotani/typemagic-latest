import { styles } from "@/styles";
import { styled } from "@stitches/react";

const Divider = styled("div", {
  width: "100%",
  height: "1px",
  backgroundColor: styles.primaryStrokeColor,

  variants: {
    isVertical: {
      true: {
        width: "1px",
        height: "100%",
      },
    },
  },
});

export default Divider;

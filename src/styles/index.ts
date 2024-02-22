const borderColor = "rgba(0, 0, 0, 0.045)";
const disabledBorderColor = "rgba(256, 256, 256, 0.05)";

const darkGreenBg = "#1E2C22";

const selectedBg = "rgba(0, 0, 0, 0.05)";

const minimalButtonVerticalPadding = 10;

const buttonBg = "rgba(0, 0, 0, 0.8)";

export const hexToRGBA = (hex: string, alpha: number) => {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const styles = {
  primaryBg: selectedBg,
  primaryStrokeColor: borderColor,
  buttonBg,

  mainMenuBg: "rgba(0, 0, 0, 0.02)",

  heartFill: "#FF4F4F",

  contextBg: "#FFEFEA",
  agentBg: "#EAEEFF",
  agentHoverBg: "#DAE2FF",
  agentTextColor: "#476AFF",
  contextColor: "#FF8159",

  landingPageBg: "#FAFAFA",

  aiMessageBg: "rgba(0, 0, 0, 0.02)",
  inputBg: selectedBg,

  iconFill: "rgba(0, 0, 0, 0.5)",

  formBg: "rgba(0, 0, 0, 0.5)",

  markdownLinkColor: "rgba(0, 0, 0, 0.9)",

  fontSize: {
    base: 15,
    caption: 13,
  },

  minimalButtonVerticalPadding,
  agentTitleHeight: minimalButtonVerticalPadding * 2 + 27,

  fontWeight: {
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
  },

  fontColor: {
    primary: "rgba(0, 0, 0, 0.85)",
    secondary: "rgba(0, 0, 0, 0.65)",
    subHeader: "rgba(138, 133, 153, 0.74)",
    caption: "rgba(0, 0, 0, 0.6)",
    disabled: "rgba(0, 0, 0, 0.3)",

    special: "#9F54FF",
    error: "rgba(175, 124, 124, 1.0)",
  },

  divider: "1px solid rgba(0, 0, 0, 0.05)",
  border: "1px solid " + borderColor,
  disabledBorder: "1px solid " + disabledBorderColor,
  selectedBackground: selectedBg,
  hoverBackground: "rgba(0, 0, 0, 0.03)",
  positive: "#00ff00",
  negative: "red",

  borderRadius: 4,
  boxShadow: "",

  spacing: {
    sm: 8,
    md: 16,
    lg: 32,
    xlg: 48,
    xxlg: 64,
  },

  loadingSpinnerBg: buttonBg,
  loadingSpinnerFg: "#B742CA",

  actionIconColor: "#B742CA",

  errorBg: "#FFB9B9",

  underline: {
    cursor: "pointer",
    [`&:hover`]: {
      textDecoration: "underline",
    },
    textUnderlineOffset: "2px",
  },

  flows: {
    // Gather flow:
    activeFlowBorder: "1px solid rgba(256, 256, 256, 0.20)",

    // Fulfilled
    fulfilledBackground: darkGreenBg,
    fulfilledBackgroundHover: "#243429",
    fulfilledIconColor: "#29EB8E",

    // Not gathered
    notFulfilledBackground: "#2C2C2C",
    notFulfilledBackgroundHover: "#2C2C2C",
    notFulfilledIconColor: "rgba(256, 256, 256, 0.5)",

    // Action flow:

    // Active
    activeActionFlowBackground: "#2F2535",
    activeActionFlowBackgroundHover: "#34293A",
    activeActionFlowIconColor: "#B742CA",

    // Disabled
    disabledActionFlowBackground: "#252525",
    disabledFillColor: "rgba(256, 256, 256, 0.2)",
  },

  transitionDuration: 300,
};

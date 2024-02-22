export const Section = (isMobile: boolean) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: isMobile ? "flex-start" : "center",
  gap: 32,
  width: "100%",
  padding: "60px 16px",
});

export const SectionHeader = (isMobile: boolean) => ({
  fontSize: isMobile ? 24 : 32,
  fontWeight: 400,
});

export const HeroTitle = (isMobile: boolean) => ({
  display: "flex",
  flexDirection: "column",
  fontSize: isMobile ? 28 : 48,
  letterSpacing: -1.8,
  textAlign: isMobile ? "left" : "center",
  paddingTop: isMobile ? 32 : 90,
  fontWeight: 600,
  lineHeight: 1.3,
});

export const HeroCaption = (isMobile: boolean) => ({
  fontSize: 18,
  color: "rgba(0, 0, 0, 0.6)",
  lineHeight: 1.6,
  textAlign: isMobile ? "left" : "center",
});

export const SectionCaption = (isMobile: boolean) => ({
  fontSize: 16,
  color: "rgba(0, 0, 0, 0.45)",
  fontWeight: 500,
  lineHeight: 1.6,
});

export const SectionTitleSection = (isMobile: boolean) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 24,
  alignItems: isMobile ? "flex-start" : "center",
});

//@ts-nocheck
import { Avatar } from "@/components/base/Avatar";
import { MinimalButton } from "@/components/base/MinimalButton";
import { inter, protoMono } from "@/fonts";
import { styles } from "@/styles";
import { constants } from "@/styles/constants";

export const KarthikMessage = (props: { isMobile: boolean }) => (
  <div style={Container(props.isMobile)} className={protoMono.className}>
    <h1 style={{ color: "black", fontSize: 32 }}>🙆‍♀️ 🤝 🤖</h1>
    <div style={{ lineHeight: "22px" }}>{constants.karthikMessage}</div>
    <MinimalButton
      onClick={() => {
        window.location.href = "/user/koopuluri";
      }}
      hugContent
      isNarrow
    >
      <Avatar src={constants.karthikAvatar}></Avatar>
      <span
        style={{ fontSize: 14, marginLeft: -2 }}
        className={inter.className}
      >
        koopuluri
      </span>
    </MinimalButton>
  </div>
);

const Container = (isMobile: boolean) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: 24,
  maxWidth: 500,
  whiteSpace: "pre-wrap",
  color: "rgba(0, 0, 0, 0.6)",
  gap: 24,
  border: styles.border,
  borderRadius: 4,
});

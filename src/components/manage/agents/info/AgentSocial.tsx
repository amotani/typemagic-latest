import { MinimalButton } from "@/components/base/MinimalButton";
import { protoMono } from "@/fonts";
import { Chat, Heart } from "@/icons";
import { styles } from "@/styles";
import { formatLikes } from "@/utils";
import { styled } from "@stitches/react";

export const AgentSocial = (props: {
  likes: number;
  chats: number;
  doesUserLike?: boolean;
  onLikeClick?: () => void;
  onChatClick?: () => void;
}) => {
  const SocialRow = styled("div", {
    display: "flex",
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  });

  const Label = styled("span", {
    fontWeight: 500,
    color: styles.fontColor.primary,
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 16,
        padding: "8px 16px",
        background: "#F4F4F4",
        border: styles.border,
        borderRadius: 4,
        width: "fit-content",
      }}
    >
      <SocialRow>
        <MinimalButton
          onClick={props.onLikeClick ? props.onLikeClick : () => ""}
          hugContent
          noBorder
          isNarrow
        >
          <Heart isActive={props.doesUserLike} />
        </MinimalButton>
        <Label className={protoMono.className}>
          {formatLikes(props.likes)}
        </Label>
      </SocialRow>
      <SocialRow>
        <MinimalButton
          onClick={props.onChatClick ? props.onChatClick : () => ""}
          hugContent
          noBorder
          isNarrow
        >
          <Chat />
        </MinimalButton>
        <Label className={protoMono.className}>{props.chats}</Label>
      </SocialRow>
    </div>
  );
};

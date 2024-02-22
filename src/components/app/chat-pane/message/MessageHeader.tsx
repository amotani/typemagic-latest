import { Avatar } from "@/components/base/Avatar";
import { inter, protoMono } from "@/fonts";
import { styles } from "@/styles";
import { Agent } from "@/utils/types";
import { styled } from "@stitches/react";

export const MessageHeader = (props: {
  agent?: Agent;
  isTypemagic?: boolean;
}) => {
  const handle = props.agent?.creatorHandle || "@typemagic";
  const name = props.agent?.name || "";

  if (!props.isTypemagic && !props.agent) return null;

  return (
    <Container>
      <Handle
        className={inter.className}
        isClickable={handle !== "@typemagic"}
        onClick={() =>
          handle !== "@typemagic" ? window.open(`/user/${handle}`) : null
        }
      >
        {props.agent?.creatorPicture && (
          <Avatar src={props.agent?.creatorPicture} width={24} />
        )}
        {handle}
      </Handle>
      {name && <span style={{ color: "rgba(0, 0, 0, 0.3)" }}>/</span>}
      {name && (
        <Name
          className={protoMono.className}
          onClick={() => window.open(`/agent/${props.agent!.humanReadableId}`)}
        >
          {name}
        </Name>
      )}
    </Container>
  );
};

const Handle = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 4,
  fontSize: 14,
  color: "rgba(0, 0, 0, 0.9)",

  variants: {
    isClickable: {
      true: {
        ...styles.underline,
      },
    },
  },
});

const Name = styled("div", {
  color: styles.agentTextColor,
  fontSize: 13,
  ...styles.underline,
});

const Container = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: 4,
  alignItems: "center",
});

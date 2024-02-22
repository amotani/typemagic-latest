import { UserPlanInfo } from "@/utils/types";
import { styled } from "@stitches/react";
import { Body, SubHeader } from "../../base/Text";
import { constants } from "@/styles/constants";
import { MinimalButton } from "../../base/MinimalButton";
import { styles } from "@/styles";
import { Caption } from "../../base/Text";

export const UserPlanSection = (props: { userPlanInfo: UserPlanInfo }) => {
  let buttonLabel;
  let messagesLabel;
  let planName;
  let model;

  if (props.userPlanInfo.currentPlan === 2) {
    // Pro plan:
    planName = "Pro plan";
    model = "GPT-4";
  } else if (props.userPlanInfo.currentPlan === 1) {
    // Pro plan:
    buttonLabel = "Upgrade to Pro";
    messagesLabel =
      props.userPlanInfo.messageCount +
      `/${constants.messagesLimit[1]} messages`;
    planName = "Pro";
    model = "ChatGPT";
  } else {
    // Free plan:
    buttonLabel = "Upgrade";
    messagesLabel =
      props.userPlanInfo.messageCount +
      `/${constants.messagesLimit[0]} messages`;
    planName = "Free plan";
    model = "ChatGPT";
  }

  return (
    <Container>
      <InfoContainer>
        <Body>{planName}</Body>
        {messagesLabel ? (
          <Caption color={styles.fontColor.caption}>
            {messagesLabel + " | " + model}
          </Caption>
        ) : (
          <Caption>{model}</Caption>
        )}
      </InfoContainer>
      {buttonLabel && (
        <MinimalButton
          isBlack
          label={buttonLabel}
          onClick={() => {
            window.open("/plans");
          }}
        ></MinimalButton>
      )}
    </Container>
  );
};

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  padding: 16,
  borderTop: "1px solid " + styles.primaryStrokeColor,
  gap: 8,
});

const InfoContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: 8,
  alignItems: "center",
  justifyContent: "space-between",
});

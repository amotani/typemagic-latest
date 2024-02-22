import { User, UserPlanInfo } from "@/utils/types";
import { styled } from "@stitches/react";
import { AvatarUploader } from "./AvatarUploader";
import { Avatar } from "../base/Avatar";
import { Form } from "../base/form/Form";
import Input from "@/components/base/form/Input";
import { SaveButtonContainer } from "../manage/agents/info";
import { Button } from "../base/Button";
import { useState } from "react";
import { Title } from "../base/Text";
import { getIdToken, signOut } from "@/utils/auth";
import { constants } from "@/styles/constants";
import { MinimalButton } from "../base/MinimalButton";
// Responsible for showing user their info and allowing them to edit it.
export const UserInfoForm = (props: {
  user: User;
  planInfo: UserPlanInfo;
  onClose: () => void;
}) => {
  const [values, setValues] = useState<{ [key: string]: string }>({
    handle: props.user.handle,
    bio: props.user.bio ?? "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      props.onClose();
      return true;
    }
    return false;
  };

  const isFormValid = (): boolean => {
    return values.name !== "" && values.handle !== "";
  };

  const isSaveButtonVisible = (): boolean => {
    return (
      values.bio !== (props.user.bio || "") ||
      values.handle !== props.user.handle
    );
  };

  const onSubmit = async () => {
    setIsLoading(true);
    let idToken = await getIdToken();
    let response = await fetch("/api/user/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idToken,
        handle: values.handle,
        bio: values.bio ? values.bio : "",
      }),
    });
    if (response.status === 409) {
      // There is a conflict with the handle.
      alert("Handle already exists.");
    }
    setIsLoading(false);
  };

  const planInfo = () => {
    const name = constants.plansNames[props.planInfo.currentPlan];

    const messagesLabel = `${props.planInfo.totalMessageCount} / ${
      //@ts-ignore
      constants.messagesLimit[props.planInfo.currentPlan]
    }`;

    return (
      <MinimalButton
        noBorder
        hugContent
        isNarrow
        onClick={() => window.open(`/plans`)}
      >{`${name}:  ${messagesLabel}`}</MinimalButton>
    );
  };

  return (
    <Container>
      <AvatarRow>
        <Avatar src={props.user.picture} />
        <AvatarUploader userId={props.user.id} />
      </AvatarRow>

      <span
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 8,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
          }}
        >
          <Title>{props.user.handle}</Title>
          {planInfo()}
        </span>
        <MinimalButton
          onClick={signOut}
          label="Sign out"
          isNarrow
          hugContent
          noBorder
        />
      </span>
      <Form>
        <Input
          label="Handle"
          maxLength={constants.validations.userHandle.maxLength}
          value={values.handle}
          onChange={(handle: string) => setValues({ ...values, handle })}
          placeholder="Enter handle"
          autoFocus={true}
          onKeyDown={onKeyDown}
        />
        <Input
          label="Bio"
          isMultiline={true}
          maxLength={constants.validations.userBio.maxLength}
          height={140}
          value={values.bio}
          onChange={(bio: string) => setValues({ ...values, bio })}
          onKeyDown={onKeyDown}
        />
        {isSaveButtonVisible() && (
          <SaveButtonContainer>
            <Button
              disabled={!isFormValid()}
              disabledLabel={"Please fill out all fields."}
              label="Update"
              onClick={() => onSubmit()}
              isLoading={isLoading}
            />
          </SaveButtonContainer>
        )}
      </Form>
    </Container>
  );
};

const AvatarRow = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: 8,
  alignItems: "center",
});

const Container = styled("div", {
  width: 500,
  padding: 24,
  display: "flex",
  flexDirection: "column",
  gap: 24,
});

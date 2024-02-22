import { styled } from "@stitches/react";
import { Body } from "../base/Text";
import { TypemagicSymbol } from "@/icons";
import Link from "next/link";
import { MinimalButton } from "../base/MinimalButton";
import { signOut } from "@/utils/auth";
import { useEffect } from "react";
import { log } from "@/utils/logging";

export const MobileMessage = (props: { email: string }) => {
  useEffect(() => {
    log("Mobile reject", { email: props.email });
  }, []);
  return (
    <Container>
      <MinimalButton
        hugContent
        isNarrow
        onClick={() => {
          signOut();
          window.location.href = "/";
        }}
      >
        <TypemagicSymbol />
      </MinimalButton>
      <Body>
        Hey there, unfortunately we don't support smaller devices at the moment
        :((( <br />
        <br />
        We're hard at work to ship mobile mode and will let you know as soon as
        it's ready.
      </Body>
    </Container>
  );
};

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 24,
  padding: 16,
});

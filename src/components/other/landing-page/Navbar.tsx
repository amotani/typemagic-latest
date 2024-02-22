//@ts-nocheck
import { TypemagicSymbol } from "@/icons";
import { MinimalButton } from "../../base/MinimalButton";
import { Button } from "../../base/Button";
import { constants } from "@/styles/constants";
import Link from "next/link";
import { signIn } from "@/utils/auth";
import { styles } from "@/styles";
import { LinkButton } from "@/components/base/LinkButton";

export const Navbar = (props: {
  isPlans?: boolean;
  isSignedIn?: boolean;
  isCreators?: boolean;
}) => (
  <div style={Container}>
    <div style={ContentContainer}>
      <div style={LogoContainer}>
        <Link href="/">
          <TypemagicSymbol />
        </Link>
      </div>
      <div style={RightPane}>
        {!props.isPlans && (
          <Link href="/plans">
            <span style={{ fontSize: 12, fontWeight: 400 }}>Plans</span>
          </Link>
        )}
        {!props.isCreators && (
          <LinkButton label={"Creators"} href="/create" small special />
        )}
        <MinimalButton
          label={props.isSignedIn ? "Go to chat" : "Sign in"}
          onClick={() => {
            if (props.isSignedIn) return (window.location.href = "/chat");
            signIn();
          }}
        />
      </div>
    </div>
  </div>
);

const ContentContainer = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  padding: 8,
  alignItems: "center",
  maxWidth: constants.landingPageContentWidth,
};

const Container = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
  background: "rgba(256, 256, 256, 0.7)",
  position: "fixed",
  top: 0,
};

const LogoContainer = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 4,
  cursor: "pointer",
};

const RightPane = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 16,
};

const NavLink = {
  fontSize: 16,
  color: "#fff",
};

//@ts-nocheck
import { Navbar } from "./Navbar";
import {
  HeroCaption,
  HeroTitle,
  Section,
  SectionTitleSection,
} from "./section";
import { constants } from "@/styles/constants";
import { auth, signIn } from "@/utils/auth";
import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Caption } from "../../base/Text";
import { log } from "@/utils/logging";
import { styles } from "@/styles";

import style from "./landing.module.css";
import { inter, protoMono } from "@/fonts";
import { usePopularAgents } from "@/utils/magic/usePopularAgents";
import { AgentsGrid } from "@/components/app/new-chat/AgentsGrid";
import { KarthikMessage } from "./KarthikMessage";

export const LandingPage = () => {
  let [isMobile, setIsMobile] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  let { popularAgents } = usePopularAgents();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (!isSigningIn) window.location.href = "/chat";
      }
    });

    log("Landing page");

    setIsMobile(window.innerWidth < 600);
    isMobileRef.current = window.innerWidth < 600;
    return () => unsubscribe();
  }, []);

  const isMobileRef = useRef(isMobile);

  const onSignIn = () => {
    setIsSigningIn(true);
    signIn();
  };

  return (
    <div style={Container} className={protoMono.className}>
      <Navbar isSignedIn={false} />
      <div style={ContentContainer}>
        <div style={{ ...Section(isMobile), gap: 40 }}>
          <div style={{ ...SectionTitleSection(isMobile) }}>
            {!isMobile && (
              <img height={52.06} width={64.55} src="/landing-logo.png" />
            )}
            <div style={HeroTitle(isMobile)} className={protoMono.className}>
              There's an agent for that
            </div>
            <div style={HeroCaption(isMobile)} className={inter.className}>
              <span
                style={{
                  color: styles.agentTextColor,
                  fontWeight: 500,
                  fontSize: 16,
                  marginRight: 8,
                }}
                className={protoMono.className}
              >
                typemagic
              </span>
              is a social network to express yourself through ChatGPT agents.
            </div>
            <CTA isMobile={isMobile} onClick={onSignIn}>
              Sign in
            </CTA>
          </div>
          <div style={{ marginTop: 120, width: "100%" }}>
            <AgentsGrid
              header="Popular"
              agents={popularAgents}
              onClick={() => onSignIn()}
              isMobile={isMobile}
            />
          </div>
          <div style={{ marginTop: 120 }}>
            <KarthikMessage isMobile={isMobile} />
          </div>
        </div>

        <div style={Footer}>
          <Caption>Typemagic Technologies, Inc. @2023 - SF.</Caption>
        </div>
      </div>
    </div>
  );
};

const Footer = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: 16,
  alignItems: "center",
};

export const CTA = (props: {
  isMobile: boolean;
  onClick: () => void;
  children: any;
}) => {
  return (
    <button
      onClick={props.onClick}
      className={style.cta + " " + protoMono.className}
      style={{
        marginTop: 24,
        width: props.isMobile ? "100%" : 300,
        display: "flex",
        flexDirection: "row",
        gap: 8,
        padding: styles.minimalButtonVerticalPadding + "px 12px",
        cursor: "pointer",
        border: styles.border,
        color: "white",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 16,
        letterSpacing: -0.1,
        borderRadius: 4,
      }}
    >
      {props.children}
    </button>
  );
};

const Container = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: styles.landingPageBg,
};

const ContentContainer = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: constants.landingPageContentWidth,
  paddingBottom: 120,
};

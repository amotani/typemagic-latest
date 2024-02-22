//@ts-nocheck
import { Navbar } from "../landing-page/Navbar";
import {
  HeroCaption,
  HeroTitle,
  Section,
  SectionTitleSection,
} from "../landing-page/section";
import { constants } from "@/styles/constants";
import { auth, signIn } from "@/utils/auth";
import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Caption } from "../../base/Text";
import { log } from "@/utils/logging";
import { styles } from "@/styles";

import style from "./creators.module.css";
import { inter, protoMono } from "@/fonts";
import { usePopularAgents } from "@/utils/magic/usePopularAgents";
import { AgentsGrid } from "@/components/app/new-chat/AgentsGrid";
import { KarthikMessage } from "../landing-page/KarthikMessage";
import { CTA } from "../landing-page";
import { SectionHeader } from "../landing-page/section";
import { SectionCaption } from "../landing-page/section";
import Image from "next/image";
import { ImageContainer } from "../ImageContainer";

export const CreatorsPage = () => {
  let [isMobile, setIsMobile] = useState(false);
  let [screenWidth, setScreenWidth] = useState(-1);

  let { popularAgents } = usePopularAgents();

  useEffect(() => {
    log("Creators page");
    setIsMobile(window.innerWidth < 600);
    isMobileRef.current = window.innerWidth < 600;
    setScreenWidth(window.innerWidth);
  }, []);

  const isMobileRef = useRef(isMobile);

  const onSignIn = () => {
    setIsSigningIn(true);
    signIn();
  };

  const SECTION_GAP = 24;

  return (
    <div style={Container} className={protoMono.className}>
      <Navbar isSignedIn={true} isCreators />
      <div style={ContentContainer}>
        <div style={{ ...Section(isMobile), gap: 40 }}>
          <div
            className="hero-section"
            style={{ ...SectionTitleSection(isMobile) }}
          >
            {!isMobile && (
              <img height={52.06} width={64.55} src="/landing-logo.png" />
            )}
            <div style={HeroTitle(isMobile)} className={protoMono.className}>
              Create ChatGPT agents
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
              lets you create and share your agents with the world.
            </div>
            <div style={HeroCaption(isMobile)} className={inter.className}>
              Your agents follow your instructions, and can reference external
              knowledge.
            </div>
            <ImageContainer
              isMobile={isMobile}
              src={
                isMobile
                  ? "/creator-hero-image-mobile.png"
                  : "/creator-hero-image.png"
              }
              width={isMobile ? screenWidth - 32 : 516}
              alt="Creators"
            />
            <CTA isMobile={isMobile} onClick={onSignIn}>
              Get started
            </CTA>
          </div>
        </div>

        <div style={{ ...Section(isMobile), gap: SECTION_GAP }}>
          <div style={SectionHeader(isMobile)} className={protoMono.className}>
            Keep improving
          </div>
          <div style={SectionCaption(isMobile)} className={inter.className}>
            See all chats with your agent so that you can improve its prompt.
          </div>
          <ImageContainer
            isMobile={isMobile}
            src="/improve-agent.png"
            width={800}
            alt="Improve agent"
          />
        </div>

        <div style={{ ...Section(isMobile), gap: SECTION_GAP }}>
          <KarthikMessage isMobile={isMobile} />
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

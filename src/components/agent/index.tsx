import { styles } from "@/styles";
import { constants } from "@/styles/constants";
import { auth, db } from "@/utils/db";
import { Agent, User } from "@/utils/types";
import { styled } from "@stitches/react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import Head from "next/head";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../base/LoadingSpinner";
import { useUser } from "@/utils/auth/useUser";
import { AgentInfo } from "./AgentInfo";
import { onAuthStateChanged } from "firebase/auth";
import { Button } from "../base/Button";
import { signIn } from "@/utils/auth";

const AgentPage = (props: { id: string }) => {
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        if (!userId) setUserId(user.uid);
      } else {
        // User is signed out
        // Direct users to the landing page:
        // window.location.href = "/";
      }
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      const q = query(
        collection(db, "agents"),
        where("humanReadableId", "==", props.id),
        where("isPublic", "==", true)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setAgent({ id: doc.id, ...doc.data() } as Agent);
        setLoading(false);
      });
      setLoading(false);
    };
    fetch();
  }, [userId, props.id]);

  const onChatClick = () => {
    if (!agent) return;
    if (userId !== null) {
      window.location.href = `/chat?activeAgent=${agent.id}`;
    } else {
      signIn(agent.id);
    }
  };

  return (
    <AgentPageContainer>
      <Head>
        <title>{agent ? agent.name : "Agent"}</title>
        <meta name="description" content={constants.metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading ? <LoadingSpinner /> : null}
      {agent ? <AgentInfo agent={agent} userId={userId} /> : ""}
      {!loading && !agent ? <div>Agent not found</div> : ""}
      <BottomSection>
        <Button
          label={userId !== null ? "Chat" : "Sign in to chat"}
          onClick={onChatClick}
        />
      </BottomSection>
    </AgentPageContainer>
  );
};

export const AgentPageContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
  height: "100%",
  background: "white",
  paddingTop: "6rem",
  padding: 16,
  overflowY: "scroll",
  position: "relative",
  paddingBottom: 200,
});

const BottomSection = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
  position: "fixed",

  width: "100%",
  maxWidth: constants.agentPageContentWidth,
  bottom: 0,
  padding: 16,
});

export default AgentPage;

import { useUser } from "@/utils/auth/useUser";
import { db } from "@/utils/db";

import { styled } from "@stitches/react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { ManageNavbar, ManagePage } from "../Navbar";
import { AgentListItem } from "./AgentListItem";
import { InfoPane } from "./info";
import { styles } from "@/styles";
import { MinimalButton } from "../../base/MinimalButton";
import { uuidv4 } from "@firebase/util";

import { Body, Caption, Header, SubHeader, Title } from "../../base/Text";
import { useNavigate } from "react-router-dom";
import { log } from "@/utils/logging";
import { constants } from "@/styles/constants";
import { Agent, AgentStatus } from "@/utils/types";
import { protoMono } from "@/fonts";

const ContextPage = () => {
  let { userId, user, userPlanInfo } = useUser();
  let [agents, setAgents] = useState<Agent[] | null>(null);
  let [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  let selectedAgentRef = useRef(selectedAgent);

  let navigate = useNavigate();

  useEffect(() => {
    if (selectedAgent) {
      selectedAgentRef.current = selectedAgent;
      navigate(`/manage/agents?id=${selectedAgent?.id}`);
      log("Selected agent", { id: selectedAgent.id });
    }
  }, [selectedAgent]);

  useEffect(() => {
    // When the url changes, update the selected context
    // to the one in the url
    let searchParams = new URLSearchParams(location.search);
    let selectedId = searchParams.get("id") ?? undefined;

    if (selectedId && agents) {
      let selectedAgent = agents.find((c) => c.id === selectedId);
      if (selectedAgent && selectedAgentRef.current?.id !== selectedId) {
        setSelectedAgent(selectedAgent);
      }
    }
  }, [location.search]);

  useEffect(() => {
    // Fetch the user's contexts (Which are in Firestore collection called "contexts")
    // and set them to the userContexts state variable
    if (!userId) return;

    const unsub = onSnapshot(
      query(
        collection(db, "agents"),
        where("creatorId", "==", userId),
        orderBy("lastEdited", "desc")
      ),

      (querySnapshot) => {
        if (!querySnapshot || querySnapshot.empty) setAgents([]);
        const agents: Agent[] = [];

        // Get selected if from url:
        const searchParams = new URLSearchParams(location.search);
        let selectedId = searchParams.get("id") ?? undefined;

        let doesSelectedContextExist = false;
        querySnapshot.forEach((doc) => {
          agents.push({ id: doc.id, ...doc.data() } as Agent);
          // Update selected as well:
          if (selectedId === doc.id) {
            doesSelectedContextExist = true;
            setSelectedAgent({ id: doc.id, ...doc.data() } as Agent);
          }
        });

        if (!doesSelectedContextExist) {
          // Update selected context to the first one in the list:
          setSelectedAgent(agents[0]);
        }

        setAgents(agents);
      }
    );

    return () => unsub();
  }, [userId]);

  const createNewAgent = () => {
    if (!user || agents === null) return;

    const newAgent: Agent = {
      id: uuidv4(),
      name: "Unnamed agent",
      isPublic: false,
      description: "",
      humanReadableId: "",
      creatorId: user.id,
      creatorHandle: user.handle,
      isNew: true,
      lastEdited: new Date(),
      status: AgentStatus.Processing,
      likes: 0,
      chats: 0,
    };

    setAgents([...agents, newAgent]);
    setSelectedAgent(newAgent);
  };

  const privateAgents = agents?.filter((c) => !c.isPublic);
  const publicAgents = agents?.filter((c) => c.isPublic);

  return (
    <Container>
      <ManageNavbar user={user} page={ManagePage.Agents} />
      <MainContainer>
        <ListPane>
          <ListInfo>
            {/* <Body>
              A prompt can be any instructions / context you want Typemagic to
              know about when you chat with it.
            </Body> */}
            <ListHeader>
              <span style={{ fontSize: 24, marginRight: 12 }}>🤖</span>Agents
            </ListHeader>
            <MinimalButton
              label="Create agent"
              onClick={createNewAgent}
              isSelected={true}
              isBlack
            />
          </ListInfo>
          <ContextListContainer>
            <AgentSection>
              <SubHeader>Private</SubHeader>
              <AgentList>
                {privateAgents?.map((agent) => (
                  <AgentListItem
                    id={agent.id}
                    name={agent.name}
                    isSelected={selectedAgent?.id === agent.id}
                    onClick={() => setSelectedAgent(agent)}
                  />
                ))}
                {privateAgents?.length === 0 && <Caption>-</Caption>}
              </AgentList>
            </AgentSection>
            <AgentSection>
              <SubHeader>Public</SubHeader>
              <AgentList>
                {publicAgents?.map((agent) => (
                  <AgentListItem
                    id={agent.id}
                    name={agent.name}
                    isSelected={selectedAgent?.id === agent.id}
                    onClick={() => setSelectedAgent(agent)}
                  />
                ))}
              </AgentList>
            </AgentSection>
            {/* {agents?.map((agent) => (
              <AgentListItem
                id={agent.id}
                name={agent.name}
                isSelected={selectedAgent?.id === agent.id}
                onClick={() => setSelectedAgent(agent)}
              />
            ))} */}
          </ContextListContainer>
        </ListPane>
        <InfoPaneContainer>
          {selectedAgent && user && (
            <InfoPane user={user} agent={selectedAgent} />
          )}
        </InfoPaneContainer>
      </MainContainer>
    </Container>
  );
};

export default ContextPage;

export const Container = styled("div", {
  height: "100%",
  background: styles.landingPageBg,
});

export const Centered = styled("div", {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

export const MainContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  height: "calc(100% - 50px)",
});

export const ContextListContainer = styled("div", {
  display: "flex",
  padding: 24,
  gap: 24,
  flexDirection: "column",
  height: "100%",
  overflow: "scroll",
  ...constants.noScrollStyles,
});

export const AgentSection = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 12,
});

export const AgentList = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 4,
});

export const ListPane = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: 350,
});

export const ListHeader = (props: { children: any }) => (
  <span
    className={protoMono.className}
    style={{
      fontSize: "22px",
      lineHeight: "30px",
      fontWeight: "600",
      letterSpacing: -0.1,
      color: styles.fontColor.primary,
    }}
  >
    {props.children}
  </span>
);

export const ListInfo = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 24,
  padding: 24,
  paddingBottom: 0,
});

export const InfoPaneContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  flex: 1,
  borderLeft: styles.border,
  height: "100%",
});

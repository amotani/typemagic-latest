import { AgentListItem } from "@/components/manage/agents/AgentListItem";
import { styles } from "@/styles";
import { constants } from "@/styles/constants";
import { useUser } from "@/utils/auth/useUser";
import { db } from "@/utils/db";
import { styled } from "@stitches/react";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  or,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { use, useEffect, useState } from "react";
import { AgentChatInfo } from "./AgentChatInfo";
import { Body, Title } from "@/components/base/Text";
import { Agent } from "@/utils/types";

const admin = "zScPajNS3uQC6RJ3fKN58UWrKTv1";

const AgentChats = (props: { id: string }) => {
  const [agent, setAgent] = useState<Agent | null>(null);
  const [chats, setChats] = useState<
    { id: string; timestampe: Date; title: string }[]
  >([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const { userId } = useUser();

  useEffect(() => {
    if (!userId) return;
    // First, fetch the agent, to get the agent's actual id:
    const fetchAgent = async () => {
      let q = query(
        collection(db, "agents"),
        where("humanReadableId", "==", props.id),
        where("creatorId", "==", userId)
      );

      if (userId === admin) {
        q = query(
          collection(db, "agents"),
          where("humanReadableId", "==", props.id)
        );
      }

      const agentForHandle = await getDocs(q);
      if (agentForHandle.docs.length === 0) {
        return;
      }
      const agent = agentForHandle.docs[0];
      setAgent({ id: agent.id, ...agent.data() } as Agent);
    };
    fetchAgent();
  }, [userId]);

  useEffect(() => {
    if (!agent?.id) return;
    // Now fetch the chats for this agent:
    let q = query(
      collection(db, "agents", agent.id, "chats"),
      orderBy("timestamp", "desc"),
      limit(500)
    );

    const unsub = onSnapshot(q, (querySnapshot) => {
      let chats: any = [];
      querySnapshot.forEach((doc) => {
        chats.push({ id: doc.id, ...doc.data() });
      });
      setChats(chats);
      if (!selectedChatId) {
        setSelectedChatId(chats[0]?.id);
      }
    });
    return unsub;
  }, [agent?.id]);

  return (
    <Container>
      <MainContainer>
        <ListPane>
          <ListInfo>
            <span style={{ fontSize: 32 }}>🤖</span>
            <Title>{agent?.name}</Title>
          </ListInfo>
          <ContextListContainer>
            <Body>Chats this agent has had</Body>
            <AgentSection>
              {chats.map((c) => (
                <AgentListItem
                  id={c.id}
                  name={c.title}
                  isSelected={c.id === selectedChatId}
                  onClick={() => setSelectedChatId(c.id)}
                />
              ))}
            </AgentSection>
          </ContextListContainer>
        </ListPane>
        <InfoPaneContainer>
          {selectedChatId && agent?.id && (
            <AgentChatInfo agent={agent} chatId={selectedChatId} />
          )}
        </InfoPaneContainer>
      </MainContainer>
    </Container>
  );
};

export default AgentChats;

const Container = styled("div", {
  height: "100%",
  background: styles.landingPageBg,
});

const Centered = styled("div", {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

const MainContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  height: "calc(100% - 50px)",
});

const ContextListContainer = styled("div", {
  display: "flex",
  padding: 24,
  gap: 24,
  flexDirection: "column",
  height: "100%",
  overflow: "scroll",
  ...constants.noScrollStyles,
});

const AgentSection = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 12,
});

const AgentList = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 4,
});

const ListPane = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: 500,
});

const ListInfo = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 24,
  padding: 24,
  paddingBottom: 0,
});

const InfoPaneContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  flex: 1,
  borderLeft: styles.border,
  height: "100%",
});

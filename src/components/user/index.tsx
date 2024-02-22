import { useEffect, useState } from "react";
import { AgentPageContainer } from "../agent";
import { Agent, User } from "@/utils/types";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/utils/db";
import { Body, Title } from "../base/Text";
import { AgentPill } from "../app/side-menu/AgentPill";
import { styled } from "@stitches/react";
import { AgentContainer } from "../agent/AgentInfo";
import { Markdown } from "../base/Markdown";
import { getUserInfo } from "@/utils/functions";
import { LoadingSpinner } from "../base/LoadingSpinner";
import { Avatar } from "../base/Avatar";

// Visible even when user not signed in.
const UserPage = (props: { handle: string }) => {
  const [user, setUser] = useState<User | null>(null);
  const [agents, setAgents] = useState<Agent[] | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch agents for this user:
    const q = query(
      collection(db, "agents"),
      where("creatorHandle", "==", props.handle),
      where("isPublic", "==", true)
    );
    const querySnapshot = getDocs(q);
    querySnapshot.then((querySnapshot) => {
      const agents: Agent[] = [];
      querySnapshot.forEach((doc) => {
        agents.push({ id: doc.id, ...doc.data() } as Agent);
      });
      setAgents(agents);
    });

    const fetchUser = async () => {
      // Fetch user:
      const user = await getUserInfo(props.handle);
      if (user) setUser(user);
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  return (
    <AgentPageContainer>
      <AgentContainer>
        {isLoading && <LoadingSpinner />}
        <Info>
          <Avatar width={50} src={user?.picture} />
          <Title>{props.handle}</Title>
          <Body>
            <Markdown content={user?.bio || ""} />
          </Body>
        </Info>
        <List>
          <Title>Agents</Title>
          {agents?.map((agent) => (
            <AgentPill
              agent={agent}
              onClick={() => window.open(`/agent/${agent.humanReadableId}`)}
            />
          ))}
        </List>
      </AgentContainer>
    </AgentPageContainer>
  );
};

const Info = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 12,
  width: "100%",
});

const List = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 12,
  width: "100%",
});

export default UserPage;

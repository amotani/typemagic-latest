import { use, useEffect, useState } from "react";
import { Agent } from "../types";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../db";

export const useActiveAgent = (agentId: string | null) => {
  const [activeAgent, setActiveAgent] = useState<Agent | null>(null);
  const [isActiveAgentFetching, setIsActiveAgentFetching] = useState(false);

  const fetchAndSetAgent = async (agentId: string) => {
    setIsActiveAgentFetching(true);
    const docRef = doc(db, "agents", agentId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let agent = { id: docSnap.id, ...docSnap.data() } as Agent;
      setActiveAgent(agent);
    } else {
      console.log("Agent doc doesn't exist: ", agentId);
    }
    setIsActiveAgentFetching(false);
  };

  useEffect(() => {
    // TODO: Fetch and set this agent from Firestore:
    if (!agentId) return setActiveAgent(null);
    if (agentId) {
      // Fetch from Firestore:
      fetchAndSetAgent(agentId);
    }
  }, [agentId]);

  return {
    activeAgent,
    isActiveAgentFetching,
    setActiveAgent,
  };
};

import { useEffect, useState } from "react";
import { getRecommendations } from "../functions";
import { Agent, Message } from "@/utils/types";

export const useRecommend = (userId: string, popularAgents: Agent[]) => {
  let [recommendedAgents, setRecommendedAgents] = useState<Agent[]>([]);
  let [isFetching, setIsFetching] = useState(false);

  const recommend = async (chatId: string, messages: Message[]) => {
    if (messages.length <= 1) return;
    setIsFetching(true);
    let agents = await getRecommendations(userId, messages, chatId);
    setRecommendedAgents(agents);
    setIsFetching(false);
  };

  const agents =
    recommendedAgents.length === 0 ? popularAgents : recommendedAgents;

  const publicAgents = agents.filter((agent) => agent.creatorId !== userId);
  const privateAgents = agents.filter((agent) => agent.creatorId === userId);

  return {
    recomendedPublicAgents: publicAgents,
    recommendedPrivateAgents: privateAgents,
    recommend,
    isRecommending: isFetching,
    clearRecommendations: () => setRecommendedAgents([]),
  };
};

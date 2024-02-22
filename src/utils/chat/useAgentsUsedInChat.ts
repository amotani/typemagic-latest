import { useEffect, useState } from "react";
import { Agent, Message } from "../types";
import {
  collection,
  documentId,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/utils/db";

const areSetsEqual = (xs: any, ys: any) =>
  xs.size === ys.size && [...xs].every((x) => ys.has(x));

export const useAgentsUsedInChat = (chatId: string, messages: Message[]) => {
  let [agentsMap, setAgentsMap] = useState<{ [key: string]: Agent }>({});

  useEffect(() => {
    // Compare the set of the keys of agentsMap, with the set of the message.agentUsed, for each message, and if there is a difference, update agentsMap:
    const agentsUsedInChat: string[] = [];
    messages.forEach((message) => {
      if (message.agentUsed && !agentsUsedInChat.includes(message.agentUsed)) {
        agentsUsedInChat.push(message.agentUsed);
      }
    });

    // If there is a difference between set(agentsUsedInChat) and set(Object.keys(agentsMap)), update agentsMap:
    const agentsUsedInChatSet = new Set(agentsUsedInChat);
    const agentsMapSet = new Set(Object.keys(agentsMap));

    if (
      !areSetsEqual(agentsUsedInChatSet, agentsMapSet) &&
      agentsUsedInChat.length > 0
    ) {
      const theQuery = query(
        collection(db, "agents"),
        where(documentId(), "in", agentsUsedInChat)
      );

      // Update agentsMap by fetching the agents from the server:
      const unsubscribe = onSnapshot(
        theQuery,
        (snapshot: any) => {
          const agentsMap: { [key: string]: Agent } = {};

          snapshot.docs.map((doc: any) => {
            agentsMap[doc.id] = { id: doc.id, ...doc.data() } as Agent;
          });

          setAgentsMap(agentsMap);
        },
        (error) => {
          console.log(error);
        }
      );
      return () => unsubscribe();
    }
  }, [chatId, messages.length]);

  return {
    agentsUsedInChatMap: agentsMap,
  };
};

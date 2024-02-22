import { useEffect, useState } from "react";
import { auth, db } from "../db";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
import { updateLike } from "../functions";

export const useUserSocial = (userId?: string) => {
  const [likedAgents, setLikedAgents] = useState<{ [key: string]: true }>({});

  useEffect(() => {
    if (!userId) return;
    const q = query(collection(db, "users", userId, "likedAgents"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let likedAgents: { [key: string]: true } = {};
      querySnapshot.forEach((doc) => {
        likedAgents[doc.id] = true;
      });
      setLikedAgents(likedAgents);
    });
    return unsub;
  }, [userId]);

  const toggleLike = async (agentId: string) => {
    if (!userId) return;
    if (!doesUserLikeAgent(agentId)) {
      await setDoc(doc(db, "users", userId, "likedAgents", agentId), {
        likedAt: new Date(),
      });

      await updateLike(agentId, true);
    } else {
      try {
        await deleteDoc(doc(db, "users", userId, "likedAgents", agentId));
      } catch (e) {
        // Do nothing. Means the agent was not liked in the first place.
      }

      await updateLike(agentId, false);
    }
  };

  const doesUserLikeAgent = (agentId: string): boolean => {
    return likedAgents[agentId] ? true : false;
  };

  return { toggleLike, doesUserLikeAgent };
};

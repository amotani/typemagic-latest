import { auth, db } from "../db";
import { useEffect, useState } from "react";
import { User, UserPlanInfo } from "../types";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";

import { onAuthStateChanged } from "firebase/auth";

import { useParams } from "react-router-dom";
import { getSearchKey, getUserPlanInfo } from "../functions";
import { identify } from "../logging";
import { createUniqueHandle } from "..";
import { useUserSocial } from "./useUserSocial";

import { signOut } from "@/utils/auth";

export const useUser = () => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [userPlanInfo, setUserPlanInfo] = useState<UserPlanInfo | undefined>(
    undefined
  );
  const [searchKey, setSearchKey] = useState<string | undefined>(undefined);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        if (!userId) setUserId(user.uid);
      } else {
        // User is signed out
        // Direct users to the landing page:
        window.location.href = "/";
      }
    });
  }, []);

  useEffect(() => {
    const fetch = async () => {
      if (userId) {
        const data = await getSearchKey();
        if (data) setSearchKey(data.key as string);
      }
    };
    fetch();
  }, [userId]);

  const fetchAndSetUserPlanInfo = async (userId: string) => {
    // Fetch the userPlanInfo from edge func:
    let userPlanInfo = await getUserPlanInfo(userId);
    setUserPlanInfo(userPlanInfo);
  };

  useEffect(() => {
    if (userId) {
      fetchAndSetUserPlanInfo(userId);

      const unsub = onSnapshot(doc(db, "users", userId), async (document) => {
        let receivedUser = document.data() as User;
        if (!receivedUser) {
          signOut();
        }

        // If user has no handle, then update the user with a handle:
        if (!receivedUser.handle) {
          receivedUser.handle = createUniqueHandle(receivedUser.name);
          await updateDoc(doc(db, "users", userId), {
            handle: receivedUser.handle,
            bio: "",
          });
        }

        setUser({
          ...receivedUser,
          id: userId,
          handle: receivedUser.handle,
          recentAgents: receivedUser.recentAgents || [],
        });
        if (receivedUser.email) identify(receivedUser.email);
      });

      return unsub;
    }
  }, [userId]);

  useEffect(() => {
    if (userId) fetchAndSetUserPlanInfo(userId);
  }, [user?.lastMessagedAt]);

  return { userId, user, userPlanInfo, searchKey };
};

import { useEffect, useState } from "react";
import { Agent } from "../types";
import {
  documentId,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../db";

export const usePopularAgents = (userId?: string) => {
  let [popularAgents, setPopularAgents] = useState<Agent[]>([]);

  const fetchPopularAgents = async () => {
    let response = await fetch("/api/magic/popularAgents", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let data = await response.json();
    setPopularAgents(data);
  };

  useEffect(() => {
    fetchPopularAgents();
  }, []);

  return { popularAgents };
};

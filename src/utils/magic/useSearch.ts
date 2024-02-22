import algoliasearch from "algoliasearch/lite";
import { useEffect, useRef, useState } from "react";
import { Agent } from "../types";

export const useSearch = (userId: string, searchKey?: string) => {
  const [results, setResults] = useState<Agent[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  let indexRef = useRef<any>();

  useEffect(() => {
    if (searchKey) {
      const searchClient = algoliasearch("P2GVB0HBVC", searchKey);
      indexRef.current = searchClient.initIndex("agents");
    }
  }, [searchKey]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      search(searchTerm);
    }
  }, [searchTerm]);

  const search = async (searchTerm: string) => {
    if (!indexRef.current) return;
    const result = await indexRef.current.search(searchTerm);

    const results: Agent[] = [];

    result.hits.forEach((hit: any) => {
      results.push({
        id: hit.objectID,
        ...hit,
      });
    });

    setResults(results);
  };

  return { searchTerm, setSearchTerm, results };
};

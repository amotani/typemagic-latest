import { Agent } from "@/utils/types";
import { AgentPill } from "../app/side-menu/AgentPill";
import { styled } from "@stitches/react";
import { styles } from "@/styles";
import { useSearch } from "@/utils/magic/useSearch";
import { useEffect, useState } from "react";
import { SearchResult } from "./SearchResult";
import { commonInputStyles } from "../base/form/Input";
import { Body } from "../base/Text";
import { SearchInfoPane } from "./SearchInfoPane";
import { constants } from "@/styles/constants";

export const Search = (props: {
  userId: string;
  searchKey?: string;
  defaultAgents?: Agent[];
  onEscape: () => void;
  onAgentSelect: (agent: Agent) => void;
}) => {
  const { searchTerm, setSearchTerm, results } = useSearch(
    props.userId,
    props.searchKey
  );

  const [focusedIndex, setFocusedIndex] = useState(0);

  const toShow = searchTerm ? results : props.defaultAgents || [];

  useEffect(() => {
    if (toShow.length === 0) return setFocusedIndex(0);
    if (focusedIndex > toShow.length - 1) setFocusedIndex(toShow.length - 1);
  }, [results]);

  const activeAgent = toShow[focusedIndex];

  return (
    <Container>
      <Input
        onChange={(e: any) => setSearchTerm(e.target.value)}
        autoFocus
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (toShow.length === 0) return;
            props.onAgentSelect(activeAgent);
          }

          if (e.key === "Escape") props.onEscape();

          if (e.key === "ArrowDown" || (e.ctrlKey && e.key === "n")) {
            e.preventDefault();
            setFocusedIndex((i) => Math.min(i + 1, toShow.length - 1));
          }

          if (e.key === "ArrowUp" || (e.ctrlKey && e.key === "p")) {
            setFocusedIndex((i) => Math.max(i - 1, 0));
          }
        }}
      />
      <ResultList>
        {toShow.map((result, i) => (
          <SearchResult
            agentName={result.name}
            creatorHandle={result.creatorHandle}
            creatorPicture={result.creatorPicture}
            likes={result.likes}
            isFocused={i === focusedIndex}
            onClick={() => props.onAgentSelect(result)}
          />
        ))}
        {toShow.length === 0 && (
          <div style={{ padding: 16 }}>
            <Body>No results</Body>
          </div>
        )}
      </ResultList>
      {activeAgent && (
        <InfoPane>
          <SearchInfoPane agent={activeAgent} />
        </InfoPane>
      )}
    </Container>
  );
};

const Input = styled("input", {
  ...commonInputStyles,
  background: "rgba(0, 0, 0, 0.8)",
  color: "white",
  width: "100%",
  marginLeft: -1, // Why the flying fuck are these necessary? Lol. But without these the input is slightly off on the screen.
  marginTop: -1,
  marginBottom: -1,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  padding: 16,
});

const ResultList = styled("div", {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  maxHeight: 500,
  overflow: "scroll",
  ...constants.noScrollStyles,
});

const InfoPane = styled("div", {
  position: "absolute",
  left: 508,
});

const Container = styled("div", {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  width: 500,
});

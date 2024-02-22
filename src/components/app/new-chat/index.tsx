import { Body, SubHeader } from "@/components/base/Text";
import { TypemagicSymbol } from "@/icons";
import { Agent } from "@/utils/types";
import { styled } from "@stitches/react";
import { useEffect, useRef, useState } from "react";
import PromptEditor from "../chat-pane/PromptEditor";
import { AgentsGrid } from "./AgentsGrid";
import { useHotkeys } from "react-hotkeys-hook";
import { constants } from "@/styles/constants";
import { protoMono } from "@/fonts";
import { styles } from "@/styles";

export const NewChat = (props: {
  userId: string;
  popularAgents: Agent[];
  onAgentSelect: (agent: Agent) => void;
  onSubmitChat: (prompt: string, agent?: Agent) => void;
  launchSearch: () => void;
}) => {
  let [isFetchingMatch, setIsFetchingMatch] = useState(false);

  useHotkeys("meta+k", props.launchSearch);

  let promptEditorRef = useRef<HTMLTextAreaElement>(null);
  let [isEditorFocused, setIsEditorFocused] = useState(false);
  let [editorValue, setEditorValue] = useState("");

  const submit = async (prompt: string) => {
    // 1. Fetch the match:
    setIsFetchingMatch(true);

    let response = await fetch("/api/magic/match", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        idToken: atob(props.userId),
      }),
    });

    try {
      // If no match, will get back a 'null', therefore the following .json() will throw an error.
      let agent = await response.json();
      return props.onSubmitChat(prompt, agent ? agent : undefined);
    } catch (e) {}

    props.onSubmitChat(prompt);
    setIsFetchingMatch(false);
  };

  return (
    <Container>
      <Section>
        <LogoSection>
          <TypemagicSymbol />
          <span
            className={protoMono.className}
            style={{ color: styles.agentTextColor, fontSize: 16 }}
          >
            typemagic
          </span>
        </LogoSection>
        <span className={protoMono.className} style={{ fontSize: 16 }}>
          Ask anything and we'll find the best agent to answer.
        </span>
      </Section>
      <Section>
        <PromptEditor
          onSubmit={() => submit(editorValue)}
          onChange={(value: string) => setEditorValue(value)}
          value={editorValue}
          isActive={true}
          editorRef={promptEditorRef}
          onFocus={() => setIsEditorFocused(true)}
          onBlur={() => setIsEditorFocused(false)}
          isFocused={isEditorFocused}
          isVisible={true}
          handleGlobalKeyDown={(e: React.KeyboardEvent) => {
            if (e.metaKey && e.key === "k") {
              props.launchSearch();
            }
            return false;
          }}
          isLoading={isFetchingMatch}
        />
      </Section>
      <Section>
        <AgentsSection>
          {props.popularAgents.length > 0 && (
            <AgentsGrid
              agents={props.popularAgents}
              onClick={props.onAgentSelect}
              header="Popular"
            />
          )}
        </AgentsSection>
      </Section>
    </Container>
  );
};

const LogoSection = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  fontSize: 24,
  gap: 8,
  color: "black",
  fontWeight: 500,
});

const Section = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 32,
  width: "100%",
  alignItems: "center",
});

const AgentsSection = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  width: "100%",
});

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: 1000,
  width: "100%",
  margin: "0 auto",
  padding: "9rem 0px",
  gap: 90,
  height: "100%",
  overflow: "scroll",
  ...constants.noScrollStyles,
});

import { styled } from "@stitches/react";
import { Prompt } from "next/font/google";
import PromptEditor from "./PromptEditor";

import { ChatMessages } from "./ChatMessages";
import { Agent, Chat, User, UserPlanInfo } from "@/utils/types";
import { useHotkeys } from "react-hotkeys-hook";
import StopExecutionButton from "./StopExecutionButton";
import { hexToRGBA, styles } from "@/styles";
import { MinimalButton } from "@/components/base/MinimalButton";
import { useRef, useState } from "react";
import Modal from "@/components/base/Modal";
import ChatHistory from "./ChatHistory";
import { Clock, Plus, Refresh } from "@/icons";
import { createNewId } from "@/utils";
import { constants } from "@/styles/constants";
import { Caption } from "@/components/base/Text";
import {
  CHAT_GPT,
  GPT_4,
  getModelForPlan,
} from "@/pages/api/api-utils/chat-completion";
import { RecommendedQuestions } from "./RecommendedQuestions";
import { inter } from "@/fonts";

export const ChatPane = (props: {
  userId: string;
  plan: UserPlanInfo | undefined;
  user: User | undefined;

  chat: Chat;
  startNewChat: () => void;
  isProcessing: boolean;
  isChatFetching: boolean;
  submit: (v: string) => void;
  abort: () => void;

  agentsUsedInChatMap: { [key: string]: Agent };
  endOfChatMessage: { agent: Agent; message: string } | undefined;

  launchSearch: () => void;

  recommendedQuestions: string[];
}) => {
  let {
    user,
    chat,
    startNewChat,
    isProcessing,
    isChatFetching,
    submit,
    abort,
  } = props;

  let [isChatHistoryOpen, setIsChatHistoryOpen] = useState(false);

  let promptEditorRef = useRef<HTMLTextAreaElement>(null);
  let [isEditorFocused, setIsEditorFocused] = useState(false);
  let [editorValue, setEditorValue] = useState("");

  useHotkeys("/", (e: any) => {
    e.preventDefault();
    promptEditorRef.current?.focus();
  });

  useHotkeys("meta+enter", () => {
    if (isChatHistoryOpen) return;
  });

  useHotkeys("meta+k", () => props.launchSearch());

  const handleEscape = () => {
    if (isChatHistoryOpen) return setIsChatHistoryOpen(false);
  };

  useHotkeys("esc", () => handleEscape());

  if (!chat) return null;

  const modelInfo = () => {
    const model = getModelForPlan(props.plan!);
    const modelName = model === CHAT_GPT ? "3.5" : "GPT 4";

    let limit = "";
    if (props.plan?.currentPlan === 0 && model === GPT_4) {
      limit = `${props.plan!.totalMessageCount} / ${
        constants.trialMessageLimit
      }`;
    }

    return (
      <MinimalButton
        noBorder
        isNarrow
        hugContent
        onClick={() => window.open("/plans")}
      >
        <span>🧠</span>
        {modelName} {limit && <Caption>({limit})</Caption>}
      </MinimalButton>
    );
  };

  // Apply a max length on the title rendered (and add an ellipsis if too long). Max length = 50 chars
  const chatTitle =
    chat.title.length > constants.chatTitleMaxLength
      ? chat.title.substring(0, constants.chatTitleMaxLength) + "..."
      : chat.title;

  return (
    <Container>
      {isChatHistoryOpen && (
        <Modal onClose={() => setIsChatHistoryOpen(false)}>
          <ChatHistory
            userId={props.userId}
            onSelect={(chatId: string) => window.open(`/chat?id=${chatId}`)}
          />
        </Modal>
      )}
      <TitleBar className={inter.className}>
        {props.plan && modelInfo()}
        {chatTitle}
        <RightNav>
          <MinimalButton
            label="New"
            onClick={startNewChat}
            hugContent
            isNarrow
            noBorder
          ></MinimalButton>

          <MinimalButton
            onClick={() => setIsChatHistoryOpen(true)}
            hugContent
            isNarrow
            noBorder
          >
            <Clock />
          </MinimalButton>
        </RightNav>
      </TitleBar>
      <MessagesPane>
        <MessagesContent>
          <ChatMessages
            user={user}
            chat={chat}
            isProcessing={isProcessing}
            isChatFetching={isChatFetching}
            agentsUsedInChatMap={props.agentsUsedInChatMap}
            endOfChatMessage={props.endOfChatMessage}
          />
        </MessagesContent>
      </MessagesPane>
      <EditorContainer>
        <EditorTopBar>
          {isProcessing && <StopExecutionButton onClick={abort} />}
        </EditorTopBar>
        {props.recommendedQuestions && !editorValue && (
          <RecommendedQuestions
            recommendedQuestions={props.recommendedQuestions}
            onSelect={(question: string) => {
              setEditorValue(question);
              promptEditorRef.current!.value = question;
              promptEditorRef.current!.focus();
            }}
          />
        )}
        <PromptEditor
          value={editorValue}
          onChange={(v: string) => setEditorValue(v)}
          onSubmit={() => submit(editorValue)}
          isActive={true}
          isVisible={true}
          onFocus={() => setIsEditorFocused(true)}
          onBlur={() => setIsEditorFocused(false)}
          isFocused={isEditorFocused}
          handleGlobalKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === "Escape") {
              handleEscape();
            }
            if (e.metaKey && e.key === "k") {
              props.launchSearch();
            }
            return false;
          }}
          editorRef={promptEditorRef}
        />
      </EditorContainer>
    </Container>
  );
};

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
  position: "relative",
});

const MessagesPane = styled("div", {
  display: "flex",
  flexDirection: "row",
  width: "100%",
  height: "calc(100% - 50px)",
  justifyContent: "center",
  ...constants.noScrollStyles,
  overflow: "scroll",
  variants: {
    isSaveContextFormActive: {
      true: {},
    },
  },
});

const RightNav = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 16,
});

const MessagesContent = styled("div", {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  variants: {
    isSaveContextFormActive: {
      true: {
        marginLeft: -400,
      },
    },
  },
});

const TitleBar = styled("div", {
  fontSize: 14,
  fontWeight: 400,
  display: "flex",
  flexDirection: "row",
  padding: 16,
  width: "100%",
  justifyContent: "space-between",
  borderBottom: styles.border,
  alignItems: "center",
  height: 50,
});

const EditorContainer = styled("div", {
  bottom: 0,
  width: "100%",
  padding: 16,
  paddingBottom: 12,
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  gap: 16,
});

const EditorTopBar = styled("div", {
  display: "flex",
  flexDirection: "row",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
});

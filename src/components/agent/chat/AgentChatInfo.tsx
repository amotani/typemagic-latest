import { ChatMessages } from "@/components/app/chat-pane/ChatMessages";
import { LoadingSpinner } from "@/components/base/LoadingSpinner";
import { constants } from "@/styles/constants";
import { getChatInfo } from "@/utils/functions";
import { Agent, Chat } from "@/utils/types";
import { styled } from "@stitches/react";
import { useEffect, useState } from "react";

export const AgentChatInfo = (props: { agent: Agent; chatId: string }) => {
  const [chat, setChat] = useState<Chat | null>(null);
  useEffect(() => {
    const fetch = async () => {
      const info = await getChatInfo(props.chatId, props.agent.id);
      console.log("found: ", info);
      setChat(info);
    };
    fetch();
  }, [props.chatId]);

  return (
    <Container>
      {chat === null && <LoadingSpinner />}
      {chat && (
        <ChatMessages
          user={undefined}
          chat={chat}
          isProcessing={false}
          isChatFetching={chat === null}
          agentsUsedInChatMap={{ [props.agent.id]: props.agent }}
          endOfChatMessage={""}
        />
      )}
    </Container>
  );
};

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  padding: 24,
  height: "100%",
  overflow: "scroll",
  ...constants.noScrollStyles,
});

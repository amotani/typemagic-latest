import { Agent, Chat, User, UserPlanInfo } from "@/utils/types";
import { styled } from "@stitches/react";
import { useEffect, useState } from "react";
import { SideMenu } from "./side-menu";
import { ChatPane } from "./chat-pane";
import { styles } from "@/styles";
import { useUser } from "@/utils/auth/useUser";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useBrain } from "@/utils/chat/useBrain";
import { NewChat } from "./new-chat";
import { useUserSocial } from "@/utils/auth/useUserSocial";
import { Search } from "../search";
import Modal from "../base/Modal";
import { useHotkeys } from "react-hotkeys-hook";
import { UserInfoForm } from "../user/UserInfoForm";
import { constants } from "@/styles/constants";
import { useIsMobile } from "@/utils/general/useIsMobile";
import { MobileMessage } from "./MobileMessage";

const App = (props: {
  userId: string;
  user?: User;
  userPlanInfo?: UserPlanInfo;
  searchKey?: string;
}) => {
  let { userId, user, userPlanInfo } = props;
  let { doesUserLikeAgent, toggleLike } = useUserSocial(userId);
  let { isMobile } = useIsMobile();

  let {
    chat,
    submit,
    isProcessing,
    abort,
    isChatFetching,
    startNewChat,
    activeAgent,
    isActiveAgentFetching,
    setActiveAgentId,

    recomendedPublicAgents,
    recommendedPrivateAgents,
    selectRecommendedAgent,
    isRecommending,

    agentsUsedInChatMap,

    onNewChatSubmit,

    endOfChatMessage,
    popularAgents,
  } = useBrain(userId, userPlanInfo);

  // Modal states:
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isUserFormActive, setIsUserFormActive] = useState(false);

  useHotkeys("Escape", () => {
    if (isSearchActive) setIsSearchActive(false);
    if (isUserFormActive) setIsUserFormActive(false);
  });

  if (isMobile && user) return <MobileMessage email={user.email} />;

  const sideMenu = () => (
    <SidePaneContainer>
      <SideMenu
        user={user}
        userPlanInfo={userPlanInfo}
        isActiveAgentFetching={isActiveAgentFetching}
        activeAgent={activeAgent}
        clearActiveAgent={() => setActiveAgentId(null)}
        recommendedPublicAgents={recomendedPublicAgents}
        recommendedPrivateAgents={recommendedPrivateAgents}
        selectRecommendedAgent={selectRecommendedAgent}
        isRecommending={isRecommending}
        doesUserLikeActiveAgent={
          activeAgent?.id ? doesUserLikeAgent(activeAgent?.id) : false
        }
        toggleLike={() => {
          if (activeAgent?.id) toggleLike(activeAgent.id);
        }}
        onSearchButtonClick={() => setIsSearchActive(!isSearchActive)}
        onUserButtonClick={() => setIsUserFormActive(true)}
        startNewChat={startNewChat}
      />
    </SidePaneContainer>
  );

  return (
    <Container>
      {isSearchActive && (
        <Modal onClose={() => setIsSearchActive(false)}>
          <Search
            userId={userId}
            searchKey={props.searchKey}
            onAgentSelect={(agent: Agent) => {
              selectRecommendedAgent(agent);
              setIsSearchActive(false);
            }}
            onEscape={() => setIsSearchActive(false)}
            defaultAgents={popularAgents}
          />
        </Modal>
      )}

      {isUserFormActive && user && userPlanInfo && (
        <Modal onClose={() => setIsUserFormActive(false)}>
          <UserInfoForm
            user={user}
            planInfo={userPlanInfo}
            onClose={() => setIsUserFormActive(false)}
          />
        </Modal>
      )}

      {sideMenu()}
      {!chat.lastEdited ? (
        <NewChat
          userId={userId}
          onSubmitChat={onNewChatSubmit}
          onAgentSelect={selectRecommendedAgent}
          popularAgents={popularAgents}
          launchSearch={() => setIsSearchActive(true)}
        />
      ) : (
        <ChatPaneContainer>
          <ChatPane
            userId={userId}
            plan={userPlanInfo}
            user={user}
            chat={chat}
            startNewChat={startNewChat}
            isProcessing={isProcessing}
            isChatFetching={isChatFetching}
            submit={submit}
            abort={abort}
            agentsUsedInChatMap={agentsUsedInChatMap}
            launchSearch={() => setIsSearchActive(true)}
            endOfChatMessage={endOfChatMessage}
            recommendedQuestions={
              activeAgent?.recommendedQuestions
                ? activeAgent.recommendedQuestions
                : []
            }
          />
        </ChatPaneContainer>
      )}
    </Container>
  );
};

const AppContainer = () => {
  let { userId, user, userPlanInfo, searchKey } = useUser();
  if (!userId) return null;
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/chat"
          element={
            <App
              userId={userId}
              user={user}
              userPlanInfo={userPlanInfo}
              searchKey={searchKey}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppContainer;

const Container = styled("div", {
  display: "flex",
  flexDirection: "row",
  height: "100%",
  width: "100%",
  background: styles.landingPageBg,
});

const SidePaneContainer = styled("div", {
  width: constants.sidePaneWidth,
  minWidth: constants.sidePaneWidth,
  height: "100%",
  borderRight: styles.border,
});

const ChatPaneContainer = styled("div", {
  flexGrow: 1,
  height: "100%",
  background: "rgba(255, 255, 255, 0.01)",
  justifyContent: "center",
});

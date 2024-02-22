import { useUser } from "@/utils/auth/useUser";
import { db } from "@/utils/db";

import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { ManageNavbar, ManagePage } from "../Navbar";
import { MinimalButton } from "../../base/MinimalButton";
import { uuidv4 } from "@firebase/util";

import { useNavigate } from "react-router-dom";
import { log } from "@/utils/logging";
import { KnowledgeSource } from "@/utils/types";
import { AgentListItem } from "../agents/AgentListItem";
import {
  AgentList,
  AgentSection,
  Container,
  ContextListContainer,
  InfoPaneContainer,
  ListHeader,
  ListInfo,
  ListPane,
  MainContainer,
} from "../agents";
import { KnowledgeInfoPane } from "./KnowledgeInfo";

const KnowledgePage = () => {
  let { userId, user, userPlanInfo } = useUser();
  let [sources, setSources] = useState<KnowledgeSource[] | null>(null);
  let [selectedSource, setSelectedSource] = useState<KnowledgeSource | null>(
    null
  );

  let selectedSourceRef = useRef(selectedSource);

  let navigate = useNavigate();

  useEffect(() => {
    if (selectedSource) {
      selectedSourceRef.current = selectedSource;
      navigate(`/manage/knowledge?id=${selectedSource?.id}`);
      log("Selected source", { id: selectedSource.id });
    }
  }, [selectedSource]);

  useEffect(() => {
    // When the url changes, update the selected context
    // to the one in the url
    let searchParams = new URLSearchParams(location.search);
    let selectedId = searchParams.get("id") ?? undefined;

    if (selectedId && sources) {
      let selectedAgent = sources.find((c) => c.id === selectedId);
      if (selectedAgent && selectedSourceRef.current?.id !== selectedId) {
        setSelectedSource(selectedAgent);
      }
    }
  }, [location.search]);

  useEffect(() => {
    // Fetch the user's contexts (Which are in Firestore collection called "contexts")
    // and set them to the userContexts state variable
    if (!userId) return;

    const unsub = onSnapshot(
      query(
        collection(db, "knowledge"),
        where("creatorId", "==", userId),
        orderBy("lastEdited", "desc")
      ),

      (querySnapshot) => {
        if (!querySnapshot || querySnapshot.empty) setSources([]);

        const sources: KnowledgeSource[] = [];

        // Get selected if from url:
        const searchParams = new URLSearchParams(location.search);
        let selectedId = searchParams.get("id") ?? undefined;

        let doesSelectedContextExist = false;
        querySnapshot.forEach((doc) => {
          sources.push({ id: doc.id, ...doc.data() } as KnowledgeSource);
          // Update selected as well:
          if (selectedId === doc.id) {
            doesSelectedContextExist = true;
            setSelectedSource({ id: doc.id, ...doc.data() } as KnowledgeSource);
          }
        });

        if (!doesSelectedContextExist) {
          // Update selected context to the first one in the list:
          setSelectedSource(sources[0]);
        }

        setSources(sources);
      }
    );

    return () => unsub();
  }, [userId]);

  const createNewSource = () => {
    if (!user || sources === null) return;

    const newSource: KnowledgeSource = {
      id: uuidv4(),
      title: "Untitled",
      url: "",
      creatorId: user.id,
      lastEdited: undefined,
    };

    setSources([...sources, newSource]);
    setSelectedSource(newSource);
  };

  return (
    <Container>
      <ManageNavbar user={user} page={ManagePage.Knowledge} />
      <MainContainer>
        <ListPane>
          <ListInfo>
            {/* <Body>
              A prompt can be any instructions / context you want Typemagic to
              know about when you chat with it.
            </Body> */}
            <ListHeader>
              <span style={{ fontSize: 24, marginRight: 12 }}>📕</span>Knowledge
            </ListHeader>
            <MinimalButton
              label="Add knowledge source"
              onClick={createNewSource}
              isSelected={true}
              isBlack
            />
          </ListInfo>
          <ContextListContainer>
            <AgentSection>
              <AgentList>
                {sources?.map((source) => (
                  <AgentListItem
                    id={source.id}
                    name={source.title}
                    isSelected={selectedSource?.id === source.id}
                    onClick={() => setSelectedSource(source)}
                  />
                ))}
              </AgentList>
            </AgentSection>
          </ContextListContainer>
        </ListPane>
        <InfoPaneContainer>
          {selectedSource && user && (
            <KnowledgeInfoPane source={selectedSource} />
          )}
        </InfoPaneContainer>
      </MainContainer>
    </Container>
  );
};

export default KnowledgePage;

import { MinimalButton } from "@/components/base/MinimalButton";
import Modal from "@/components/base/Modal";
import { A, Body } from "@/components/base/Text";
import { InputLabel } from "@/components/base/form/Input";
import { protoMono } from "@/fonts";
import { X } from "@/icons";
import { styles } from "@/styles";
import { constants } from "@/styles/constants";
import { db } from "@/utils/db";
import { updateAgentKnowledgeSources } from "@/utils/functions";
import { KnowledgeSource } from "@/utils/types";
import { styled } from "@stitches/react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export const KnowledgeSources = (props: {
  agentId: string;
  userId: string;
  sourceIds: string[];
}) => {
  const [isAddSourceModalOpen, setIsAddSourceModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [availableSources, setAvailableSources] = useState<KnowledgeSource[]>(
    []
  );

  let sources = availableSources.filter(
    (source) => !props.sourceIds.includes(source.id)
  );

  const onChange = async (sourceIds: string[]) => {
    setIsUpdating(true);
    await updateAgentKnowledgeSources(props.agentId, sourceIds);
    setIsUpdating(false);
  };

  useEffect(() => {
    const unsub = onSnapshot(
      query(
        collection(db, "knowledge"),
        where("creatorId", "==", props.userId),
        orderBy("lastEdited", "desc")
      ),

      (querySnapshot) => {
        if (!querySnapshot || querySnapshot.empty) setAvailableSources([]);

        const sources: KnowledgeSource[] = [];

        querySnapshot.forEach((doc) => {
          sources.push({ id: doc.id, ...doc.data() } as KnowledgeSource);
        });

        setAvailableSources(sources);
      }
    );
    return unsub;
  }, []);

  const sourceItems = () => {
    return props.sourceIds.map((sourceId) => {
      const source = availableSources.find((s) => s.id === sourceId);
      return (
        <SourceItem
          source={
            source
              ? source
              : { id: sourceId, creatorId: "", title: "Not found...", url: "" }
          }
          onRemove={() => {
            onChange(props.sourceIds.filter((id) => id !== sourceId));
          }}
        />
      );
    });
  };

  return (
    <Container>
      {isAddSourceModalOpen && (
        <Modal onClose={() => setIsAddSourceModalOpen(false)}>
          <Picker
            sources={sources}
            onSelect={(id: string) => {
              setIsAddSourceModalOpen(false);
              onChange([...props.sourceIds, id]);
            }}
          />
        </Modal>
      )}
      <InputLabel>Knowledge sources</InputLabel>
      {sourceItems()}
      <MinimalButton
        isLoading={isUpdating}
        label={!isUpdating ? "Add source" : ""}
        hugContent
        isNarrow
        onClick={() => setIsAddSourceModalOpen(true)}
      />
    </Container>
  );
};

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 8,
});

const book = <span style={{ fontSize: 16 }}>📕</span>;

const SourceItem = (props: {
  source: KnowledgeSource;
  onRemove: () => void;
}) => {
  return (
    <div
      className={protoMono.className}
      style={{
        padding: "6px 12px",
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        gap: 8,
        border: styles.border,
        borderRadius: 4,
        color: "rgba(0,0, 0,0.7)",
        letterSpacing: -0.2,
        fontSize: 12,
      }}
      key={props.source.id}
    >
      <MinimalButton onClick={props.onRemove} hugContent isNarrow noBorder>
        <X />
      </MinimalButton>
      {book}
      <A
        onClick={() =>
          (window.location.href = "/manage/knowledge?id=" + props.source.id)
        }
      >
        {props.source.title}
      </A>
    </div>
  );
};

const Picker = (props: {
  sources: KnowledgeSource[];
  onSelect: (id: string) => void;
}) => {
  return (
    <PickerContainer>
      {props.sources.map((source) => (
        <PickerItem onClick={() => props.onSelect(source.id)} key={source.id}>
          {book} {source.title}
        </PickerItem>
      ))}
      {!props.sources.length && (
        <div
          style={{
            padding: 16,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <Body>No knowledge sources found</Body>
          <MinimalButton
            label="Manage knowledge"
            onClick={() => {
              window.location.href = "/manage/knowledge";
            }}
            hugContent
            isBlack
          />
        </div>
      )}
    </PickerContainer>
  );
};

const PickerContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: 500,
  height: "100%",
  maxHeight: 500,
  overflow: "scroll",
  ...constants.noScrollStyles,
});

const PickerItem = styled("div", {
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  gap: 8,
  width: "100%",
  cursor: "pointer",
  padding: "16px 12px",
  "&:hover": {
    backgroundColor: styles.hoverBackground,
  },
});

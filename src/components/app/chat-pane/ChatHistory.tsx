import React, { useState, useEffect } from "react";
import { styles } from "@/styles";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/utils/db";
import { LoadingSpinner } from "@/components/base/LoadingSpinner";
import { styled } from "@stitches/react";
import { constants } from "@/styles/constants";
import { Body, Header, Title } from "@/components/base/Text";
import { log } from "@/utils/logging";
import { inter } from "@/fonts";

type Props = {
  userId: string;
  onSelect: (chatId: string) => void;
};

type ChatPreview = {
  chatId: string;
  title: string;
  createdAt: FirebaseFirestore.Timestamp;
};

const ChatHistory: React.FC<Props> = ({ userId, onSelect }) => {
  const [chatPreviews, setChatPreviews] = useState<ChatPreview[] | null>(null);

  const fetchChatPreviews = () => {
    const q = query(
      collection(db, "chatPreviews"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
      limit(300)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const previews: ChatPreview[] = [];
      snapshot.forEach((doc) => {
        previews.push({ ...doc.data(), chatId: doc.id } as ChatPreview);
      });

      setChatPreviews(previews);
    });

    log("Chat history");

    // Cleanup the listener
    return () => {
      unsubscribe();
    };
  };

  useEffect(fetchChatPreviews, [userId]);

  return (
    <Container>
      <Top>
        <Title>Chat history</Title>
      </Top>
      <PreviewsContainer>
        {!chatPreviews && <LoadingSpinner />}
        {chatPreviews &&
          chatPreviews.map((preview, index) => (
            <ItemContainer
              key={`chatPreview-${index}`}
              onClick={() => onSelect(preview.chatId)}
            >
              {preview.title}
            </ItemContainer>
          ))}
      </PreviewsContainer>
    </Container>
  );
};

const Container = styled("div", {
  width: 500,
  height: 400,
  display: "flex",
  flexDirection: "column",
});

const ItemContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  width: "100%",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  padding: 16,
  ["&:hover"]: {
    background: styles.selectedBackground,
    cursor: "pointer",
  },
  borderRadius: 4,
});

const PreviewsContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100%",
  padding: 16,
  overflow: "scroll",
  ...constants.noScrollStyles,
});

const Top = styled("div", {
  display: "flex",
  flexDirection: "column",
  padding: 16,
  background: "rgba(0, 0, 0, 0.02)",
  borderBottom: styles.border,
  alignItems: "center",
});

export default ChatHistory;

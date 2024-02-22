import { styled } from "@stitches/react";
import { useEffect, useRef, useState } from "react";
import { Form, Title } from "@/components/base/form/Form";
import Input, { InputLabel } from "@/components/base/form/Input";
import { Button } from "../../../base/Button";
import { MinimalButton } from "../../../base/MinimalButton";
import {
  Firestore,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "@/utils/db";

import { Message, MessageType } from "../../../base/form/Message";
import { Agent, User } from "@/utils/types";
import {
  deleteAgent,
  saveAgent,
  updateAgentKnowledgeSources,
} from "@/utils/functions";
import { AgentMetadata } from "./AgentMetadata";
import { Trash } from "@/icons";
import { constants } from "@/styles/constants";
import { LoadingSpinner } from "@/components/base/LoadingSpinner";
import Modal from "@/components/base/Modal";
import { styles } from "@/styles";

import { useHotkeys } from "react-hotkeys-hook";
import { KnowledgeSources } from "./KnowledgeSources";

export const InfoPane = ({
  user,
  agent,
  onComplete,
  onKeyDown,
}: {
  user: User;
  agent: Agent;
  onComplete?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => boolean;
}) => {
  const [values, setValues] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [error, setError] = useState("");
  const [isInitializing, setIsInitializing] = useState(true);

  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);

  const valuesRef = useRef(values);

  useHotkeys("Escape", () => {
    setIsDeleteConfirmationOpen(false);
    return false;
  });

  useEffect(() => {
    if (agent.isNew) {
      setIsInitializing(false);
      return;
    }

    const getAgentPrompt = async () => {
      const data = await getDoc(doc(db, "agents", agent.id, "prompts", "main"));
      if (data.exists()) {
        setValues({ ...valuesRef.current, prompt: data.data().prompt });
      }
      setIsInitializing(false);
    };

    getAgentPrompt();
  }, [agent.id, agent.lastEdited]);

  useEffect(() => {
    valuesRef.current = values;
  }, [values]);

  useEffect(() => {
    const updated = {
      ...values,
      id: agent.id,
      name: agent.name,
      prompt: agent.prompt ?? "",
      description: agent.description,
      recommendedQuestions: agent.recommendedQuestions
        ? agent.recommendedQuestions.join("\n")
        : "",
    };
    setValues(updated);
    valuesRef.current = updated;
  }, [agent]);

  const isFormValid = () => {
    return (values.name && values.description && values.prompt) ?? false;
  };

  const onSubmit = async (e?: any) => {
    if (isFormValid() && agent !== null) {
      // Handle form submission here

      setIsLoading(true);

      let out = await saveAgent(agent.id, {
        name: values.name,
        description: values.description,
        prompt: values.prompt,
        recommendedQuestions: values.recommendedQuestions,
      });

      setIsLoading(false);
      if (!out) {
        setError("Something went wrong. Please try again.");
      }

      if (onComplete) onComplete();
    }
  };

  const deleteThisAgent = async () => {
    if (agent !== null) {
      if (agent.isNew) {
        window.location.href = "/manage/agents";
        return;
      }
      setIsDeleteLoading(true);
      await deleteAgent(agent.id);
      setIsDeleteLoading(false);
      setIsDeleteConfirmationOpen(false);
    }
  };

  const knowledgeSources = () => {
    if (!user) return null;
    return (
      <KnowledgeSources
        agentId={agent.id}
        userId={user.id}
        sourceIds={agent.knowledgeSources ? agent.knowledgeSources : []}
      />
    );
  };

  if (isInitializing)
    return (
      <InfoContainer>
        <LoadingSpinner />
      </InfoContainer>
    );

  return (
    <InfoContainer>
      {isDeleteConfirmationOpen && (
        <Modal onClose={() => setIsDeleteConfirmationOpen(false)}>
          <DeleteConfirmation>
            <Title label="Are you sure?" />
            <MinimalButton
              label="Delete"
              onClick={deleteThisAgent}
              bgColor={styles.errorBg}
              isLoading={isDeleteLoading}
            />
            <MinimalButton
              label="Cancel"
              onClick={() => setIsDeleteConfirmationOpen(false)}
            />
          </DeleteConfirmation>
        </Modal>
      )}
      <ContentContainer>
        <AgentMetadata agent={agent} />
        <Form>
          <Input
            label="Name"
            value={values.name}
            onChange={(name: string) => setValues({ ...values, name })}
            maxLength={constants.validations.agentName.maxLength}
            placeholder="Enter name"
            autoFocus={true}
            onKeyDown={onKeyDown}
          />
          <Input
            label="Description"
            description="Visible on your agent page and within the chat when someone wants to learn more about your agent."
            maxLength={constants.validations.agentDescription.maxLength}
            value={values.description}
            onChange={(description: string) =>
              setValues({ ...values, description })
            }
            isMultiline={true}
            height={80}
            placeholder="E.g. An agent that teaches you how to write a great cold email..."
            onKeyDown={onKeyDown}
          />
          <Input
            label="Recommended questions"
            description="Suggested to users when they chat with your agent. Separate each question with a new line. At most 3."
            maxLength={constants.validations.recommendedQuestions.maxLength}
            value={values.recommendedQuestions}
            onChange={(recommendedQuestions: string) =>
              setValues({ ...values, recommendedQuestions })
            }
            isMultiline={true}
            height={100}
            placeholder="E.g. What is the best way to write a cold email?"
            onKeyDown={onKeyDown}
          />
          <Input
            label="Prompt"
            placeholder="- You are an agent that specializes in..."
            maxLength={constants.validations.agentPrompt.maxLength}
            value={values.prompt}
            onChange={(prompt: string) => setValues({ ...values, prompt })}
            isMultiline={true}
            onKeyDown={onKeyDown}
          />
          {knowledgeSources()}

          <SaveButtonContainer>
            <Button
              disabled={!isFormValid()}
              disabledLabel={"Please fill out all fields."}
              label="Save"
              onClick={() => onSubmit()}
              isLoading={isLoading}
            />
          </SaveButtonContainer>
        </Form>
        {error && <Message type={MessageType.Error} message={error} />}
        <MinimalButton
          hugContent
          onClick={() => setIsDeleteConfirmationOpen(true)}
          noBorder
        >
          <Trash />
        </MinimalButton>
      </ContentContainer>
    </InfoContainer>
  );
};

export const DeleteConfirmation = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 8,
  padding: 16,
  borderRadius: 4,
  width: 500,
  border: styles.border,
});

export const InfoContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  position: "relative",
  height: "100%",
  alignItems: "center",
  overflowY: "scroll",
  padding: 24,
  ...constants.noScrollStyles,
});

export const SaveButtonContainer = styled("div", {
  display: "flex",
  width: "100%",
  gap: 8,
  flexDirection: "column",
  alignItems: "center",
});

export const ContentContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: 800,
  gap: 48,
});

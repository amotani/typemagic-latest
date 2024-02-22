import { useEffect, useRef, useState } from "react";
import { Form, Title } from "@/components/base/form/Form";
import Input from "@/components/base/form/Input";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/db";

import { KnowledgeSource, User } from "@/utils/types";
import { Trash } from "@/icons";
import { constants } from "@/styles/constants";
import { LoadingSpinner } from "@/components/base/LoadingSpinner";
import Modal from "@/components/base/Modal";
import { styles } from "@/styles";
import { useHotkeys } from "react-hotkeys-hook";
import {
  ContentContainer,
  DeleteConfirmation,
  InfoContainer,
  SaveButtonContainer,
} from "../agents/info";
import { MinimalButton } from "@/components/base/MinimalButton";
import { Button } from "@/components/base/Button";
import { Message, MessageType } from "@/components/base/form/Message";
import { deleteKnowledgeSource, saveKnowledgeSource } from "@/utils/functions";

export const KnowledgeInfoPane = ({ source }: { source: KnowledgeSource }) => {
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
    if (source.lastEdited === undefined) {
      setIsInitializing(false);
      return;
    }

    const getSourceContent = async () => {
      const data = await getDoc(
        doc(db, "knowledge", source.id, "content", "content")
      );
      if (data.exists()) {
        setValues({ ...valuesRef.current, content: data.data().content });
      } else {
        setValues({ ...valuesRef.current, content: "" }); // Initialize content to empty.
      }
      setIsInitializing(false);
    };

    getSourceContent();
  }, [source.id, source.lastEdited]);

  useEffect(() => {
    valuesRef.current = values;
  }, [values]);

  useEffect(() => {
    const updated = {
      ...values,
      id: source.id,
      title: source.title,
      url: source.url,
    };
    setValues(updated);
    valuesRef.current = updated;
  }, [source]);

  const isFormValid = () => {
    return (values.title && values.url && values.content) ?? false;
  };

  const onSubmit = async (e?: any) => {
    if (isFormValid() && source !== null) {
      // Handle form submission here

      setIsLoading(true);

      let out = await saveKnowledgeSource(source.id, {
        title: values.title,
        url: values.url,
        content: values.content,
      });

      setIsLoading(false);
      if (!out) {
        setError("Something went wrong. Please try again.");
      }

      //if (onComplete) onComplete();
    }
  };

  const deleteThisKnowledge = async () => {
    if (source !== null) {
      if (source.lastEdited === undefined) {
        window.location.href = "/manage/knowledge";
        return;
      }
      setIsDeleteLoading(true);
      await deleteKnowledgeSource(source.id);
      setIsDeleteLoading(false);
      setIsDeleteConfirmationOpen(false);
    }
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
              onClick={deleteThisKnowledge}
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
        <Form>
          <Input
            label="Title"
            value={values.title}
            onChange={(title: string) => setValues({ ...values, title })}
            maxLength={constants.validations.knowledgeTitle.maxLength}
            placeholder="Some title."
            autoFocus={true}
          />
          <Input
            label="URL"
            value={values.url}
            onChange={(url: string) => setValues({ ...values, url })}
            maxLength={constants.validations.knowledgeUrl.maxLength}
            placeholder="https://example.com"
            description="Please ensure it's the original url for this source."
          />
          <Input
            label="Content"
            placeholder="Paste the content of the source here."
            maxLength={constants.validations.knowledgeContent.maxLength}
            value={values.content}
            onChange={(content: string) => setValues({ ...values, content })}
            isMultiline={true}
          />
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

import { TypemagicSymbol } from "@/icons";
import { styles } from "@/styles";
import { User } from "@/utils/types";
import { styled } from "@stitches/react";
import Link from "next/link";
import { MinimalButton } from "../base/MinimalButton";
import { protoMono } from "@/fonts";
import { LinkButton } from "../base/LinkButton";

export enum ManagePage {
  Agents = "agents",
  Knowledge = "knowledge",
}

export const ManageNavbar = (props: { user?: User; page: ManagePage }) => {
  return (
    <Container>
      <Row>
        <Link href="/chat" style={{ marginBottom: -4 }}>
          <TypemagicSymbol />
        </Link>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
        >
          <LinkButton
            href="/manage/agents"
            label="Agents"
            isActive={props.page === ManagePage.Agents}
          />
          <LinkButton
            href="/manage/knowledge"
            label="Knowledge"
            isActive={props.page === ManagePage.Knowledge}
          />
        </div>
      </Row>
    </Container>
  );
};

const Row = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 24,
  width: "100%",
});

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "8px 24px",
  background: "rgba(255, 255, 255, 0.02)",
  borderBottom: styles.border,
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
});

import { Caption, SubHeader, Title } from "@/components/base/Text";
import { Agent } from "@/utils/types";
import { styled } from "@stitches/react";
import { AgentPill } from "../side-menu/AgentPill";
import { AgentGridItem } from "./AgentGridItem";
import { protoMono } from "@/fonts";

export const AgentsGrid = (props: {
  header: string;
  agents: Agent[];
  onClick: (agent: Agent) => void;
  isMobile?: boolean;
}) => {
  const rows: [Agent[], Agent[]] = [[], []];

  // Divide props.agents into rows of 3.
  for (let i = 0; i < props.agents.length; i++) {
    // Odd agents in 0, even agents in 1.
    const isEven = i % 2 === 0;
    if (isEven) {
      rows[0].push(props.agents[i]);
    } else {
      rows[1].push(props.agents[i]);
    }
  }

  console.log("rows: ", rows);
  console.log("agents: ", props.agents);

  return (
    <Container>
      <span
        className={protoMono.className}
        style={{
          fontSize: "13px",
          lineHeight: "24px",
          fontWeight: "500",
          color: "rgba(0, 0, 0, 0.3)",
        }}
      >
        {props.header}
      </span>
      <Agents isMobile={props.isMobile}>
        {rows.map((row, i) => (
          <Row key={i}>
            {row.map((agent) => (
              <AgentGridItem
                key={agent.id}
                agent={agent}
                onClick={() => props.onClick(agent)}
              />
            ))}
          </Row>
        ))}
      </Agents>
    </Container>
  );
};

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 24,
});

const Agents = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: 8,

  variants: {
    isMobile: {
      true: {
        width: "100%",
        alignItems: "center",
        flexDirection: "column",
      },
    },
  },
});

const Row = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 8,
});

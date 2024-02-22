import { styles } from "@/styles";
import { constants } from "@/styles/constants";
import { styled } from "@stitches/react";
import { useEffect, useState } from "react";

export const NotionFeatures = () => {
  let [width, setWidth] = useState(1000);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  const isMobile = width < 800;

  return (
    <Container isMobile={isMobile}>
      <FeaturePill
        title="Rollback"
        desc={
          "Use Notion's page history to roll back to a previous version of your agent - in case something goes wrong."
        }
        borderRight
        isMobile={isMobile}
      />
      <FeaturePill
        title="Collaborate"
        desc={
          "Work on agents with your team in an environment they're familiar with - Notion."
        }
        borderRight
        isMobile={isMobile}
      />
      <FeaturePill
        title="Remix"
        desc={
          "As simple as duplicating an agent's Notion page and publishing in Typemagic as a new agent."
        }
        isMobile={isMobile}
      />
    </Container>
  );
};

const FeaturePill = (props: {
  title: string;
  desc: string;
  borderRight?: boolean;
  isMobile?: boolean;
}) =>
  props.isMobile ? (
    <FeaturePillContainer borderBottom={props.borderRight}>
      <Title>{props.title}</Title>
      <Desc>{props.desc}</Desc>
    </FeaturePillContainer>
  ) : (
    <FeaturePillContainer borderRight={props.borderRight}>
      <Title>{props.title}</Title>
      <Desc>{props.desc}</Desc>
    </FeaturePillContainer>
  );

const Container = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: 0,
  border: styles.border,
  borderRadius: 4,

  variants: {
    isMobile: {
      true: {
        flexDirection: "column",
      },
    },
  },
});

const Title = styled("span", {
  fontSize: 20,
});

const Desc = styled("span", {
  fontSize: 16,
  fontWeight: 300,
  color: "rgba(256, 256, 256, 0.6)",
  lineHeight: "26px",
});

const FeaturePillContainer = styled("div", {
  gap: 16,
  width: constants.landingPageContentWidth / 3,

  display: "flex",
  flexDirection: "column",
  padding: 24,

  variants: {
    borderRight: {
      true: {
        borderRight: styles.border,
      },
    },
    borderBottom: {
      true: {
        borderBottom: styles.border,
      },
    },
  },
});

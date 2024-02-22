import Head from "next/head";
import { styled } from "@stitches/react";
import { styles } from "@/styles";
import PlansPage from "@/components/other/plans-page";
import { constants } from "@/styles/constants";

export default function Pricing() {
  return (
    <PageContainer>
      <Head>
        <title>Typemagic</title>
        <meta name="description" content={constants.metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PlansPage />
    </PageContainer>
  );
}

const Container = styled("div", {
  margin: "0 auto",
  textAlign: "left",
  maxWidth: "500px",
  display: "flex",
  flexDirection: "column",
  gap: "32px",
  padding: "16px",
  paddingTop: "100px",
});

const PageContainer = styled("div", {
  background: styles.primaryBg,
});

import Head from "next/head";
import { styled } from "@stitches/react";
import { styles } from "@/styles";

import { constants } from "@/styles/constants";
import { CreatorsPage } from "@/components/other/creators-page";

const PageContainer = styled("div", {
  background: styles.primaryBg,
  width: "100%",
  height: "100%",
});

export default function Home() {
  return (
    <PageContainer>
      <Head>
        <title>Typemagic</title>
        <meta name="description" content={constants.metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CreatorsPage />
    </PageContainer>
  );
}

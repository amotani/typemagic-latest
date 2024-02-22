import Head from "next/head";
import { styled } from "@stitches/react";
import { styles } from "@/styles";
import dynamic from "next/dynamic";
import { useUser } from "@/utils/auth/useUser";
import { constants } from "@/styles/constants";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// import { App } from "@/components/app";

// @ts-ignore
const App = dynamic(
  () => import("../../components/manage/knowledge/Container"),
  {
    ssr: false,
  }
);

const PageContainer = styled("div", {
  background: styles.primaryBg,
  width: "100%",
  height: "100%",
});

export default function Home() {
  return (
    <PageContainer>
      <Head>
        <title>Knowledge</title>
        <meta name="description" content={constants.metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <App />
    </PageContainer>
  );
}

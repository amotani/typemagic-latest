//@ts-nocheck
import Head from "next/head";
import { styled } from "@stitches/react";
import { styles } from "@/styles";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

// @ts-ignore
const App = dynamic(() => import("../../components/user"), {
  ssr: false,
});

const PageContainer = styled("div", {
  background: styles.primaryBg,
  width: "100%",
  height: "100%",
});

export default function Home() {
  const router = useRouter();
  const { handle } = router.query;
  return (
    <PageContainer>
      <App handle={handle} />
    </PageContainer>
  );
}

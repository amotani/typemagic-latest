import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";

import { Inter } from "next/font/google";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { inter, protoMono } from "@/fonts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
      <Analytics />
    </main>
  );
}

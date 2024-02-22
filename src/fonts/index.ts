import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const protoMono = localFont({
  src: [
    {
      path: "./ProtoMono-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./ProtoMono-Medium.otf",
      weight: "500",
      style: "medium",
    },
    {
      path: "./ProtoMono-SemiBold.otf",
      weight: "600",
      style: "semibold",
    },
    {
      path: "./ProtoMono-Light.otf",
      weight: "300",
      style: "light",
    },
  ],
});
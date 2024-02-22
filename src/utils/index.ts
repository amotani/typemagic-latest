import { uuidv4 } from "@firebase/util";
import "firebase/firestore";
import { nanoid } from "nanoid";

export const formatFirestoreDate = (timestamp: any): string => {
  const date = timestamp.toDate();
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const hoursRaw = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  //   const ampm = hoursRaw >= 12 ? "PM" : "AM";
  //   const hours = ((hoursRaw + 11) % 12) + 1; // Convert 0 to 12 and 12 to 12

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[monthIndex];

  return `${hoursRaw}:${minutes}:${seconds} | ${month}, ${day}, ${year}`;
};

export const getCodeBlockFromContent = (input: string): string | null => {
  const regex = /```([\s\S]*?)```/g;
  const match = regex.exec(input);

  if (match && match[1]) {
    return match[1].trim();
  }
  return null;
};

export const isDevelopmentEnvironment = (): boolean => {
  return process.env.NODE_ENV === "development";
};

export const createNewId = (): string => uuidv4();

export const sleep = (milliseconds: number) => {
  return new Promise<void>((resolve) => setTimeout(resolve, milliseconds));
};

export const createUniqueHandle = (name: string): string => {
  return name.toLowerCase().replace(/\s/g, "-") + "_" + nanoid(7);
};

export const getHumanReadableIdFromName = (name: string): string => {
  // Create a human readable agent id given the agent.name:
  let humanReadableId = name
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "_")
    .substring(0, 69);
  return humanReadableId;
};

export function formatLikes(likes: number): string {
  if (likes >= 1000000) {
    return (likes / 1000000).toFixed(1) + "m";
  } else if (likes >= 1000) {
    return (likes / 1000).toFixed(1) + "k";
  } else {
    return likes.toString();
  }
}

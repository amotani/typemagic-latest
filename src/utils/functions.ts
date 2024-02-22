import { getIdToken } from "./auth";
import { convertMessagesToOpenAI } from "./openai/conversion";
import { Agent, Message } from "./types";

export const getUserPlanInfo = async (
  userId: string
): Promise<any | undefined> => {
  let response = await fetch("/api/user/planInfo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idToken: atob(userId),
    }),
  });

  let data = await response.json();
  if (response.status !== 200) {
    return undefined;
  } else {
    return data as any;
  }
};

export const getSearchKey = async (): Promise<any | undefined> => {
  let idToken = await getIdToken();
  let response = await fetch("/api/magic/searchKey", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idToken,
    }),
  });

  let data = await response.json();
  if (response.status !== 200) {
    return undefined;
  } else {
    return data;
  }
};

export const getUserInfo = async (handle: string): Promise<any | undefined> => {
  let response = await fetch("/api/user/get", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      handle,
    }),
  });

  let data = await response.json();

  if (response.status !== 200) {
    return undefined;
  } else {
    return data;
  }
};

export const logAgentChat = async (
  agentId: string,
  chatId: string,
  title: string,
  model: string
): Promise<any | undefined> => {
  const idToken = await getIdToken();
  let response = await fetch("/api/agent/logChat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idToken,
      agentId,
      chatId,
      title,
      model,
    }),
  });

  let data = await response.json();

  if (response.status !== 200) {
    return undefined;
  } else {
    return data;
  }
};

export const getRecommendations = async (
  userId: string,
  messages: Message[],
  chatId: string
): Promise<any | undefined> => {
  let response = await fetch("/api/magic/recommend", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idToken: atob(userId),
      messages,
      chatId,
    }),
  });

  let data = await response.json();
  if (response.status !== 200) {
    return undefined;
  } else {
    return data;
  }
};

export const getChatTitleRecommendation = async (
  userId: string,
  messages: Message[]
): Promise<any | undefined> => {
  let response = await fetch("/api/chat/title", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idToken: atob(userId),
      messages,
    }),
  });

  let data = await response.json();
  if (response.status !== 200) {
    return undefined;
  } else {
    return data.title as string;
  }
};

export const getChatInfo = async (
  chatId: string,
  agentId: string
): Promise<any | undefined> => {
  const idToken = await getIdToken();
  let response = await fetch("/api/chat/info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idToken,
      id: chatId,
      agentId,
    }),
  });

  let data = await response.json();
  if (response.status !== 200) {
    return undefined;
  } else {
    return data;
  }
};

export const getMessageSources = async (
  userId: string,
  activeAgentId: string,
  contentIds: string[],
  messages: Message[]
): Promise<any | undefined> => {
  const idToken = atob(userId);
  let response = await fetch("/api/chat/sources", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idToken,
      activeAgentId,
      contentIds,
      messages: convertMessagesToOpenAI(messages),
    }),
  });

  let data = await response.json();
  if (response.status !== 200) {
    return undefined;
  } else {
    return data;
  }
};

export const saveAgent = async (id: string, fields: { [key: string]: any }) => {
  let idToken = await getIdToken();
  let response = await fetch("/api/agent/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fields,
      id,
      idToken,
    }),
  });
  let data = await response.json();
  if (response.status !== 200) {
    return undefined;
  }
  return data;
};

export const saveKnowledgeSource = async (
  id: string,
  fields: { [key: string]: any }
) => {
  let idToken = await getIdToken();
  let response = await fetch("/api/knowledge/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fields,
      id,
      idToken,
    }),
  });
  let data = await response.json();
  if (response.status !== 200) {
    return undefined;
  }
  return data;
};

export const updateAgentIsPublic = async (id: string, isPublic: boolean) => {
  let idToken = await getIdToken();
  let response = await fetch("/api/agent/setIsPublic", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idToken,
      id,
      isPublic,
    }),
  });
  let data = await response.json();
  if (response.status !== 200) {
    return undefined;
  }
  return data;
};

export const updateAgentKnowledgeSources = async (
  id: string,
  sources: string[]
) => {
  let idToken = await getIdToken();
  let response = await fetch("/api/agent/saveSources", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idToken,
      id,
      knowledgeSources: sources,
    }),
  });
  let data = await response.json();
  if (response.status !== 200) {
    return undefined;
  }
  return data;
};

export const updateLike = async (agentId: string, like: boolean) => {
  let idToken = await getIdToken();
  let response = await fetch("/api/social/updateLike", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idToken,
      agentId,
      like,
    }),
  });
  let data = await response.json();
  if (response.status !== 200) {
    return undefined;
  }
  return data;
};

export const deleteAgent = async (id: string) => {
  let idToken = await getIdToken();
  let response = await fetch("/api/agent/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idToken,
      id,
    }),
  });
  let data = await response.json();
  if (response.status !== 200) {
    return undefined;
  }
  return data;
};

export const deleteKnowledgeSource = async (id: string) => {
  let idToken = await getIdToken();
  let response = await fetch("/api/knowledge/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idToken,
      id,
    }),
  });
  let data = await response.json();
  if (response.status !== 200) {
    return undefined;
  }
  return data;
};

export const getStripeCheckoutLink = async (priceId: string) => {
  let idToken = await getIdToken();
  let response = await fetch("/api/stripe/generateCheckoutLink", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idToken,
      priceId,
    }),
  });
  let data = await response.json();
  if (response.status !== 200) {
    return undefined;
  } else {
    return data.sessionUrl;
  }
};

export const getStripeCustomerPortalLink = async () => {
  let idToken = await getIdToken();
  let response = await fetch("/api/stripe/generateStripeCustomerPortalLink", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idToken,
    }),
  });
  let data = await response.json();
  if (response.status !== 200) {
    return undefined;
  } else {
    return data.sessionUrl;
  }
};

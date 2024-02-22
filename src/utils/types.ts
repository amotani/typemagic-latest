export enum Sender {
  AI = "AI",
  User = "User",
}

export type User = {
  id: string;
  name: string;
  handle: string;
  bio?: string;
  picture?: string;
  email: string;
  lastMessagedAt?: FirebaseFirestore.Timestamp;
  recentAgents: string[];
};

export type UserPlanInfo = {
  messageCount: number;
  totalMessageCount: number;
  totalTokenCount: number;
  currentPlan: number;
  userPlanLastUpdated: Date;
  stripeCustomerId?: string;
};

export type Message = {
  id: string;
  sender: Sender;
  content: string;
  createdAt: Date;
  chatId: string;
  agentUsed?: string;
  sources?: { id: string; url: string; title: string }[]; // Only for agents that use sources.
};

export type Chat = {
  id: string;
  title: string;
  messages: Message[];
  lastEdited: Date | null;
  userId: string;
  activeAgentId: string | null;
};

export enum AgentStatus {
  Processing = "Processing",
  ViolatesPolicy = "ViolatesPolicy",
  AppearsInSearch = "AppearsInSearch",
  AppearsInRecommendations = "AppearsInRecommendations",
}

export type Agent = {
  id: string;
  humanReadableId: string;
  name: string;
  isPublic: boolean;
  description: string;
  creatorId: string;
  creatorHandle: string;
  creatorPicture?: string;
  likes: number;
  chats: number;
  status: AgentStatus;

  recommendedQuestions?: string[]; // Is suggested to the user when they're chatting with this agent.
  prompt?: string;
  isNew?: boolean;
  lastEdited?: Date;

  knowledgeSources?: string[];

  // Fields for the agent landing page:
  highlights?: {
    user: string;
    agent: string;
    sources?: { name: string; url: string }[];
  }[];
  video?: string;
};

export type KnowledgeSource = {
  id: string;
  title: string;
  url: string;

  creatorId: string;
  lastEdited?: Date;

  content?: string;
};

export type AgentKVData = {
  creatorId: string;
  prompt: string;
  isPublic: boolean;
};

export type ChunkInfo = {
  id: string;
  chunk: string;
  title: string;
  url: string;
  sourceId: string;
  score: number;
};

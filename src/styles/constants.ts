const messagesLimit = {
  [0]: 500,
  [1]: 9000,
  [2]: 9999,
};

const agentsLimit = {
  [0]: 5,
};

const plansNames: { [key: number]: string } = {
  [0]: "Free",
  [1]: "Hobby",
  [2]: "Pro",
};

const trialMessageLimit = 15;

export const constants = {
  metaDescription: "There's an agent for that.",
  narrowChatPaneWidth: 600,
  chatPaneWidth: 750,

  headerDescription: "AI toolkit",
  helpUrl: "https://typemagic.com/help/",

  deployAgentSuccessMessage: "Agent published successfully!",

  actionFlowsTitle: "Actions",
  sidePaneWidth: 270,

  noScrollStyles: {
    webKitScrollbar: "none",
    msOverflowStyle: "none",
    scrollbarWidth: "none",
    ["&::-webkit-scrollbar"]: {
      display: "none",
    },
  },

  trialMessageLimit,

  messagesLimit,
  agentsLimit,
  plansNames,

  chatTitleMaxLength: 75,

  validations: {
    agentName: {
      maxLength: 50,
    },
    agentDescription: {
      maxLength: 2500,
    },
    recommendedQuestions: {
      maxLength: 300,
    },
    agentPrompt: {
      maxLength: 8000,
    },
    userHandle: {
      maxLength: 30,
    },
    userBio: {
      maxLength: 240,
    },

    knowledgeTitle: {
      maxLength: 200,
    },
    knowledgeUrl: {
      maxLength: 1000,
    },
    knowledgeContent: {
      maxLength: 99999,
    },
  },

  chatCompletionChunkSimilarityThreshold: 0.79,
  agentInitialMessageMaxLength: 1000,

  knowledgeChunkSize: 1000,

  tiers: {
    0: {
      name: "Free",
      price: 0,
      description: "A whiff.",
      benefits: [
        `First ${trialMessageLimit} messages are GPT-4.`,
        "ChatGPT AI quality.",
        `${messagesLimit[0]} messages / month limit.`,
      ],
    },
    1: {
      id: "price_1NCuLIKispraHYFrP1Xi3d6z",
      testId: "price_1NCu9wKispraHYFrCyUu5tOc",
      name: "Hobby",
      price: 9,
      description: "Feeling it.",
      benefits: [`Message limit too damn high.`],
    },
    2: {
      id: "price_1NCvLCKispraHYFrFIivmkxV",
      testId: "price_1NCuBYKispraHYFrHIY1qaYp",
      name: "Pro",
      price: 29,
      description: "Addicted to the magic.",
      benefits: [
        "GPT-4.",
        "Message limit too damn high.",
        "Priority support.",
        `Early access to new features.`,
      ],
    },
  },
  plansComments: [
    `We don't want to make money in cheap ways: if you accidentally forgot you had an active subscription we can refund you for the months that you didn't use Typemagic (or barely used it) - just email us.`,
    `** “Too damn high” = ${messagesLimit[2]} messages. You likely won't hit this limit, but if you do hit this limit with legitimate use (i.e. to actually help you accomplish / learn about things instead if hitting the limit for the sake of hitting the limit), then we're likely to give you free credits... because you're the kind of person we're building Typemagic for. I strongly believe that the quality of a product depends on the quality of the product's users, and therefore if you're legitimately pushing Typemagic to its limits, we are heavily incentivized to keep you with us - for the sake of our product, and our company.`,
    `Are you a student / researcher? Email us (karthik@typemagic.com) and describe what you want to use Typemagic for - for a chance to get a Pro subscription for free. (“Student” = anyone < 23 years of age, actively learning about something that they're passionate about - not just those who are studying at an institution).`,
  ],

  landingPageContentWidth: 900,
  agentPageContentWidth: 700,

  karthikMessage: `Artificial intelligence is taking the world by storm, and is here to stay.

Yet, on its own, AI is limited: it can be confidently wrong, hallucinate, and be biased towards popular opinions - regardless of how correct they are.

AI shines when its raw intelligence is coupled with human creativity & wisdom.

typemagic exists to facilitate this human <> AI collaboration.

Use typemagic to express yourself through ai.

I'm excited to see what you'll create.`,

  karthikAvatar:
    "https://firebasestorage.googleapis.com/v0/b/typemagic-18c6c.appspot.com/o/avatars%2FzScPajNS3uQC6RJ3fKN58UWrKTv1.png?alt=media&token=deb2ea60-28d1-4afe-ae6a-5f95a9a0de70",
};

// Order of prompts:
// 1. pluginPrompt
// 2. agent.basePrompt (creator)
// 3. userContextPrompt (start with "This is what you already know about this user:" / "You currently know nothing about this user.") (creator)
// 4. (gatherFlowBasePrompt / actionFlowBasePrompt)
// 5. activeFlow.prompt (creator)

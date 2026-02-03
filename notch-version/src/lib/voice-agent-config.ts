// Voice Agent Configuration

export const voiceAgentConfig = {
  // Eleven Labs TTS settings
  tts: {
    voiceId: process.env.ELEVEN_LABS_VOICE_ID || "UgBBYS2sOqTuMpoF3BR0",
    modelId: "eleven_turbo_v2_5",
    stability: 0.5,
    similarityBoost: 0.75,
    style: 0.0,
    speakerBoost: true,
  },

  // Claude LLM settings - reduced tokens for faster voice responses
  llm: {
    model: "claude-sonnet-4-20250514",
    maxTokens: 100,
    temperature: 0.7,
  },

  // Audio analyzer settings for visualization
  audio: {
    fftSize: 256,
    smoothingTimeConstant: 0.8,
    minDecibels: -90,
    maxDecibels: -10,
  },

  // Orb visualization settings
  orb: {
    baseRadius: 1,
    segments: 64,
    detailLevel: 4,
    colors: {
      idle: "#6366f1",
      listening: "#ef4444",
      processing: "#f59e0b",
      speaking: "#22c55e",
    },
  },

  // Wake word configuration
  wakeWord: {
    phrases: ["hey soft standards", "hey soft standard", "hey softstandards"],
    fuzzyThreshold: 0.7,
  },

  // Navigation routes
  validRoutes: [
    { path: "/", keywords: ["home", "main", "start"] },
    { path: "/services", keywords: ["services", "what you do", "offerings"] },
    { path: "/pricing", keywords: ["pricing", "prices", "cost", "rates"] },
    { path: "/case-studies", keywords: ["case studies", "portfolio", "work", "projects"] },
    { path: "/about", keywords: ["about", "who", "team", "company"] },
    { path: "/blog", keywords: ["blog", "articles", "posts", "news"] },
    { path: "/careers", keywords: ["careers", "jobs", "hiring", "work with us"] },
    { path: "/book", keywords: ["book", "schedule", "call", "appointment", "meeting", "calendar"] },
  ],

  // Booking page URL
  bookingUrl: "/book",
} as const;

export type VoiceAgentStatus = "idle" | "listening" | "processing" | "speaking" | "error";

export type ConversationMessage = {
  role: "user" | "assistant";
  content: string;
};

export type VoiceCommand = {
  type: "navigate" | "book" | "scroll" | null;
  target?: string;
};

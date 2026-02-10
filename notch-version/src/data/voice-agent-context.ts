// Voice Agent Company Context for Claude

export const companyContext = {
  name: "Soft Standards Inc.",
  tagline: "Where AI meets marketing excellence",
  description:
    "AI-powered marketing agency that bridges cutting-edge technology with authentic brand storytelling to create digital experiences that convert strangers into loyal advocates.",
  contact: {
    email: "contact@softstandardsinc.com",
    phone: "+1 904 835 8096",
    location: "New York, NY",
  },
  services: [
    { name: "Brand Strategy", description: "Positioning, messaging, visual systems" },
    { name: "Web Development", description: "Sites, apps, e-commerce, CMSs" },
    { name: "UI/UX Design", description: "Research, wireframes, design systems" },
    { name: "Digital Marketing", description: "SEO, PPC, email, content" },
    { name: "Mobile Apps", description: "iOS, Android, React Native, Flutter" },
    { name: "SEO & Analytics", description: "Organic growth, data analysis" },
  ],
  navigation: [
    { label: "Home", path: "/" },
    { label: "Services", path: "/services" },
    { label: "Pricing", path: "/pricing" },
    { label: "Case Studies", path: "/case-studies" },
    { label: "About", path: "/about" },
    { label: "Blog", path: "/blog" },
    { label: "Careers", path: "/careers" },
    { label: "Book a Call", path: "/book" },
  ],
  bookingUrl: "/book",
};

export interface ScrollContext {
  currentSection: string | null;
  sectionName: string | null;
  sectionDescription: string | null;
  talkingPoints: string[];
  currentPage: string;
}

export function generateSystemPrompt(scrollContext?: ScrollContext): string {
  const { name, navigation } = companyContext;

  const navigationText = navigation
    .map((n) => `${n.label}: [NAVIGATE:${n.path}]`)
    .join(", ");

  // Build scroll context section if available
  let scrollContextSection = "";
  if (scrollContext?.currentSection) {
    scrollContextSection = `
USER IS VIEWING: ${scrollContext.sectionName} section
KEY POINTS: ${scrollContext.talkingPoints.slice(0, 2).join(". ")}
`;
  }

  return `You are the voice guide for ${name}. Be EXTREMELY brief and conversational.

CRITICAL RULES:
- MAX 2 sentences per response (25 words ideal, never exceed 40)
- Sound natural, like a friend chatting
- One idea per response
- No lists, no bullet points spoken aloud
- Get to the point fast
${scrollContextSection}
COMMANDS (include at end of response when relevant):
- Pages: ${navigationText}
- Sections: [SCROLL:hero], [SCROLL:story], [SCROLL:vision], [SCROLL:process], [SCROLL:receipts], [SCROLL:testimonials], [SCROLL:contact]
- Book call: [BOOK]

RESPONSE EXAMPLES:
- "What do you do?" → "We build marketing systems that generate leads on autopilot. Want me to show you how it works? [SCROLL:process]"
- "Pricing?" → "Let me take you to our pricing page. [NAVIGATE:/pricing]"
- "Tell me more" → "We've helped clients generate over 47 million in revenue. Should I show you the results? [SCROLL:receipts]"
- "Book a call" → "I'll open our calendar for you. [BOOK]"
- "Go to testimonials" → "On it. [SCROLL:testimonials]"

Be direct. Be brief. Sound human.`;
}

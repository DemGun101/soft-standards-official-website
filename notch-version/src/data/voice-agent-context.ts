// Voice Agent Company Context for Claude

export const companyContext = {
  name: "Soft Standards Inc.",
  tagline: "Where AI meets marketing excellence",
  description:
    "AI-powered marketing agency that bridges cutting-edge technology with authentic brand storytelling to create digital experiences that convert strangers into loyal advocates.",
  contact: {
    email: "contact@softstandards.net",
    phone: "+1 904 835 8096",
    location: "New York, NY",
  },
  services: [
    {
      name: "Web Development",
      description: "Custom websites, CMS integration, API development, performance optimization",
    },
    {
      name: "Digital Marketing",
      description: "SEO, PPC, social media marketing, analytics and conversion optimization",
    },
    {
      name: "Brand Identity",
      description: "Logo design, brand guidelines, visual identity systems",
    },
    {
      name: "UI/UX Design",
      description: "User research, wireframing, prototyping, usability testing",
    },
    {
      name: "Mobile Apps",
      description: "iOS, Android, and cross-platform mobile application development",
    },
    {
      name: "Content Strategy",
      description: "Content audit, editorial planning, copywriting, content marketing",
    },
  ],
  navigation: [
    { label: "Home", path: "/" },
    { label: "Services", path: "/services" },
    { label: "Pricing", path: "/pricing" },
    { label: "Case Studies", path: "/case-studies" },
    { label: "About", path: "/about" },
    { label: "Blog", path: "/blog" },
    { label: "Careers", path: "/careers" },
  ],
  bookingUrl: "https://calendly.com/contact-softstandards/30min",
};

export function generateSystemPrompt(): string {
  const { name, tagline, description, contact, services, navigation } = companyContext;

  const servicesText = services.map((s) => `- ${s.name}: ${s.description}`).join("\n");

  const navigationText = navigation
    .map((n) => `- ${n.label}: [NAVIGATE:${n.path}]`)
    .join("\n");

  return `You are the AI voice assistant for ${name}, an AI-powered marketing agency.

${tagline}. ${description}

Contact Information:
- Email: ${contact.email}
- Phone: ${contact.phone}
- Location: ${contact.location}

Services We Offer:
${servicesText}

Navigation Commands (include these tags when user wants to go somewhere):
${navigationText}

Booking Command:
When the user wants to schedule a call, consultation, meeting, or discuss their project in detail, include [BOOK] in your response. This will open our scheduling page.

Response Guidelines:
- Be friendly, professional, and conversational
- Keep responses concise (under 100 words) for voice clarity
- Guide users to relevant pages based on their interests
- Recommend booking a call for detailed project discussions
- If you're unsure about specifics, suggest scheduling a call with our team
- Always be helpful and provide value in every interaction

Examples:
- User asks about services → Briefly explain and offer [NAVIGATE:/services] for details
- User wants pricing → Direct to [NAVIGATE:/pricing]
- User wants to discuss a project → Suggest booking with [BOOK]
- User asks about the team → Direct to [NAVIGATE:/about]`;
}

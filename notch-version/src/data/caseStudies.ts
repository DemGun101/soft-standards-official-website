// Case Study Types & Data

export type ServiceCategory = 'web' | 'ai' | 'social' | 'branding' | 'uiux';

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  category: ServiceCategory;
  categoryTag: string;
  url: string;
  techTags: string[];
  colorTheme: string;
  description: string;
  challenge: string;
  solution: string;
  keyResults: string[];
  screenshots: string[];
  testimonial?: {
    text: string;
    name: string;
    role: string;
  };
}

export interface ServiceSection {
  id: ServiceCategory;
  title: string;
  description: string;
  icon: string;
  projects: CaseStudy[];
}

// ---------------------------------------------------------------------------
// Web & App Dev Projects
// ---------------------------------------------------------------------------

const webProjects: CaseStudy[] = [
  {
    id: 'ryvato',
    title: 'Ryvato',
    subtitle: 'Project Management Platform',
    category: 'web',
    categoryTag: 'Web Application',
    url: 'app.ryvato.com',
    techTags: ['React', 'Dashboard', 'Analytics', 'SaaS'],
    colorTheme: '#E8A838',
    description:
      'Enterprise-grade project management platform with real-time baseline locking, deviation tracking, and comprehensive organizational dashboards. Built to manage 100+ projects across distributed teams.',
    challenge:
      'The client needed a unified platform to track project health, financial performance, resource utilization, and risk management across multiple business units — replacing fragmented spreadsheet-based workflows.',
    solution:
      'Full-stack SaaS application featuring interactive dashboards with real-time KPIs, financial variance tracking, project health visualization with donut charts, resource utilization monitoring, and a robust billing and invoicing system. Authentication supports Google, Apple, and email-based login.',
    keyResults: [
      '128+ active projects managed simultaneously',
      '342 team members onboarded',
      '87% resource utilization efficiency',
      '$15M+ in project budgets tracked',
    ],
    screenshots: ['/images/case-studies/ryvato.png'],
  },
  {
    id: 'chromos',
    title: 'Chromos',
    subtitle: 'AI Color Intelligence Engine',
    category: 'web',
    categoryTag: 'AI-Powered Web App',
    url: 'dev.chromosengine.com',
    techTags: ['AI/ML', 'Design Tool', 'SaaS', 'React'],
    colorTheme: '#4CAF50',
    description:
      'An AI-powered color palette generator that translates natural language descriptions into harmonious color schemes. Describe a mood, scene, or aesthetic — and Chromos generates the perfect palette.',
    challenge:
      "Designers and brand teams struggled to translate abstract concepts like 'calm morning meditation by a Japanese garden' into actionable color palettes. Existing tools required manual color picking without creative intelligence.",
    solution:
      'AI-powered color engine with a natural language interface that interprets descriptive prompts and generates contextually appropriate color palettes. Includes preset inspiration prompts, clean minimalist UI, and export capabilities.',
    keyResults: [
      'Natural language to color palette in < 2 seconds',
      '5 curated prompt categories for quick-start',
      'Export in multiple formats (HEX, RGB, HSL)',
      'Seamless designer-friendly workflow',
    ],
    screenshots: ['/images/case-studies/chromos.png'],
  },
  {
    id: 'hitchhyke',
    title: 'Hitchhyke',
    subtitle: 'Rideshare Platform',
    category: 'web',
    categoryTag: 'Mobile App & Website',
    url: 'hitchhyke-development-website.web.app',
    techTags: ['Mobile App', 'iOS', 'Android', 'Maps API'],
    colorTheme: '#2E7D32',
    description:
      "Jamaica's innovative rideshare platform connecting riders with drivers in real-time. A complete ecosystem with native mobile apps for iOS and Android, plus a responsive marketing website.",
    challenge:
      "Jamaica's transportation landscape lacked a reliable, tech-driven rideshare option. The client needed both a consumer-facing mobile app and a professional web presence to establish market credibility and drive downloads.",
    solution:
      'Full-stack rideshare ecosystem: native iOS and Android apps with real-time GPS tracking, trip preferences, multiple payment options (cash and card), and priority/wait-and-save ride types. Marketing website with value proposition, how-it-works flow, about section, and direct app store links.',
    keyResults: [
      'Dual-platform mobile apps (iOS + Android)',
      'Real-time driver-rider matching',
      'Multiple payment methods integrated',
      'Complete brand identity & web presence',
    ],
    screenshots: ['/images/case-studies/hitchhyke.png'],
  },
  {
    id: 'm1neral',
    title: 'm1neral',
    subtitle: 'Energy Tech Platform',
    category: 'web',
    categoryTag: 'Enterprise Web Platform',
    url: 'm1neral.com',
    techTags: ['Enterprise', 'GIS/Maps', 'Data Analytics', 'SaaS'],
    colorTheme: '#0D47A1',
    description:
      'Next-generation energy technology platform serving mineral rights managers, upstream oil & gas operators, and midstream pipeline companies. Streamlines the full asset lifecycle from opportunity to close.',
    challenge:
      'Energy sector professionals were managing mineral acquisitions, land agreements, and pipeline projects across disconnected tools — leading to missed deals, compliance risks, and inefficient asset tracking.',
    solution:
      'Comprehensive platform with three specialized modules: Minerals & Royalties (seller data enrichment, campaign management, deal tracking), Upstream Oil & Gas (land agreements, contracts, interactive asset maps), and Midstream & Pipeline (project layout, landowner management, agreement negotiation).',
    keyResults: [
      '3 specialized industry modules',
      'Interactive GIS mapping integration',
      'End-to-end deal lifecycle management',
      'Serving asset managers across the US',
    ],
    screenshots: ['/images/case-studies/m1neral.png'],
  },
  {
    id: 'ggms',
    title: 'GGMS CRM/IDX',
    subtitle: 'Real Estate Marketing System',
    category: 'web',
    categoryTag: 'CRM & Marketing Platform',
    url: 'ggms.com',
    techTags: ['CRM', 'IDX', 'Marketing Automation', 'Real Estate'],
    colorTheme: '#1976D2',
    description:
      'All-in-one CRM, IDX website, and marketing automation platform for real estate professionals. Trusted by agents, teams, and brokerages across the U.S. and Canada.',
    challenge:
      'Real estate agents were juggling multiple subscriptions for CRM, website, IDX, and marketing tools — resulting in data silos, missed follow-ups, and leads falling through the cracks.',
    solution:
      'Unified system that turns website visits and marketing activity into conversations, appointments, and closed deals. Features include IDX property search integration, automated follow-up sequences, lead scoring, and centralized conversation management.',
    keyResults: [
      'Single platform replacing 4+ tools',
      'Trusted by solo agents to multi-agent teams',
      'Thousands of contacts managed per brokerage',
      'Serving agents across the U.S. and Canada',
    ],
    screenshots: ['/images/case-studies/ggms.png'],
  },
  {
    id: 'kreatorz',
    title: 'Kreatorz',
    subtitle: 'AI & Software Solutions Agency Website',
    category: 'web',
    categoryTag: 'Agency Website',
    url: 'kreatorz.co',
    techTags: ['Branding', 'UI/UX', 'Web Design', 'WordPress'],
    colorTheme: '#7B1FA2',
    description:
      'A bold, modern agency website for Kreatorz — a creative and technology firm specializing in AI solutions, UX/UI design, branding, and digital transformation.',
    challenge:
      'Kreatorz needed a website reflecting their dual identity as a creative studio and cutting-edge technology company, while establishing credibility in the AI & software solutions space.',
    solution:
      'Visually striking agency website with clear service categorization, portfolio showcase, thought leadership blog, and conversion-optimized call-to-action flow.',
    keyResults: [
      'Complete brand identity & web presence',
      'Blog with thought leadership content',
      'Service-focused conversion architecture',
      'Responsive across all devices',
    ],
    screenshots: ['/images/case-studies/kreatorz.png'],
  },
  {
    id: 'upwork-pm',
    title: 'Upwork Proposal Manager',
    subtitle: 'Freelancer Productivity Tool',
    category: 'web',
    categoryTag: 'Web Application',
    url: 'upwork-pm-system.web.app',
    techTags: ['Firebase', 'Productivity', 'SaaS', 'React'],
    colorTheme: '#14A800',
    description:
      'A purpose-built proposal management system for Upwork freelancers. Track, organize, and optimize proposals to improve win rates and streamline the freelancing workflow.',
    challenge:
      'High-volume Upwork freelancers had no efficient way to track proposal submissions, follow-ups, response rates, and conversion metrics.',
    solution:
      'Firebase-powered web application for logging proposals, categorizing by status, tracking response rates, and identifying patterns in successful bids.',
    keyResults: [
      'Real-time proposal tracking dashboard',
      'Status-based pipeline management',
      'Win rate analytics & insights',
      'Hosted on Firebase for zero-latency access',
    ],
    screenshots: ['/images/case-studies/upwork-pm.png'],
  },
];

// ---------------------------------------------------------------------------
// Service Sections
// ---------------------------------------------------------------------------

export const serviceSections: ServiceSection[] = [
  {
    id: 'web',
    title: 'Web & App Development',
    description:
      'Full-stack web applications, mobile apps, SaaS platforms, enterprise dashboards, and custom software solutions built with modern frameworks.',
    icon: 'code',
    projects: webProjects,
  },
  {
    id: 'ai',
    title: 'AI Automations',
    description:
      'AI agents, workflow automations, chatbots, LLM-powered tools, and intelligent process automation built for businesses.',
    icon: 'cpu',
    projects: [],
  },
  {
    id: 'social',
    title: 'Social Media Marketing',
    description:
      'Social media strategy, content creation, paid advertising campaigns, organic growth management, and performance analytics.',
    icon: 'share',
    projects: [],
  },
  {
    id: 'branding',
    title: 'Branding',
    description:
      'Complete brand identity systems including logo design, color palettes, typography, brand guidelines, visual identity, and brand strategy.',
    icon: 'palette',
    projects: [],
  },
  {
    id: 'uiux',
    title: 'UI/UX Design',
    description:
      'User interface design, user experience research, wireframing, prototyping, design systems, and usability optimization.',
    icon: 'layout',
    projects: [],
  },
];

// ---------------------------------------------------------------------------
// Flat array of all case studies
// ---------------------------------------------------------------------------

export const allCaseStudies: CaseStudy[] = serviceSections.flatMap(
  (section) => section.projects
);

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------

export const STATS = {
  totalProjects: '40+',
  industriesServed: '12+',
  countries: '8+',
  satisfactionRate: '97%',
} as const;

// ---------------------------------------------------------------------------
// Filter Tabs
// ---------------------------------------------------------------------------

export const SERVICE_FILTERS = [
  { value: 'all', label: 'All Projects' },
  { value: 'web', label: 'Web & App Dev' },
  { value: 'ai', label: 'AI Automations' },
  { value: 'social', label: 'Social Media' },
  { value: 'branding', label: 'Branding' },
  { value: 'uiux', label: 'UI/UX Design' },
] as const;

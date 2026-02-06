# Soft Standards Inc. — Notch Version (Next.js)

## Project Overview

This is the **Notch Version** of the Soft Standards official website — a Next.js-based evolution of the main site with advanced features including an AI voice agent, 3D interactive elements, and modern animations.

**Soft Standards Inc.** is a SaaS-powered digital marketing agency offering:
- AI Automation
- Brand Strategy
- Web Development
- UI/UX Design
- Digital Marketing
- App Development

**Key Stats:** 120+ Projects Delivered | 98% Client Satisfaction | 8+ Years Experience

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.1.6 |
| Language | TypeScript | 5.x |
| UI | React | 19.2.3 |
| Styling | Tailwind CSS | v4 |
| Animations | GSAP + @gsap/react | 3.14.2 |
| 3D Graphics | Three.js + React Three Fiber | 0.182.0 |
| AI Chat | Anthropic SDK (@anthropic-ai/sdk) | 0.72.1 |
| AI Gen | Google Generative AI (@google/genai) | 1.39.0 |
| Voice TTS | ElevenLabs API | — |
| Package Manager | Bun | — |

---

## Project Structure

```
notch-version/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Homepage
│   │   ├── layout.tsx          # Root layout (Navbar + Footer + VoiceAgent)
│   │   ├── globals.css         # Global styles + Tailwind imports
│   │   ├── about/              # About page
│   │   ├── services/           # Services page
│   │   ├── pricing/            # Pricing page with tiers
│   │   ├── blog/               # Blog page
│   │   ├── case-studies/       # Case studies page
│   │   ├── careers/            # Careers page
│   │   ├── book/               # Booking/appointment page
│   │   └── api/                # API routes
│   │       └── voice/          # Voice agent endpoints
│   │           ├── chat/       # Claude-powered voice chat
│   │           └── tts/        # ElevenLabs text-to-speech
│   └── components/             # Reusable components
│       ├── Navbar.tsx           # Navigation with notch design
│       ├── Footer.tsx           # Site footer
│       ├── animations.tsx       # SmoothScroll + PageTransition
│       └── voice-agent/        # 3D voice agent system
│           ├── VoiceAgentOrb.tsx
│           ├── VoiceOrb3D.tsx
│           ├── AudioReactiveOrb.tsx
│           ├── TranscriptOverlay.tsx
│           └── VoiceAgentTrigger.tsx
├── public/                     # Static assets
├── .claude/skills/             # Claude Code skills
├── package.json
├── tsconfig.json
├── next.config.mjs
└── postcss.config.mjs
```

---

## Commands

```bash
bun dev          # Start development server
bun run build    # Build for production
bun start        # Start production server
bun run lint     # Run ESLint
```

---

## Development Guidelines

### Server vs Client Components
- **Default to Server Components** — only use `"use client"` for interactivity (hooks, events, browser APIs)
- Push `"use client"` boundaries down to the smallest interactive component
- Never add `"use client"` to layout.tsx or page.tsx

### Three.js / 3D Components
- Always use `dynamic(() => import(...), { ssr: false })` for any Three.js/R3F component
- Use `useFrame` from R3F instead of `requestAnimationFrame`
- Dispose geometry/material/textures on unmount

### GSAP Animations
- Use `useGSAP` from `@gsap/react` instead of `useEffect`
- Register plugins at module level, not inside components
- Scope animations with `{ scope: containerRef }`
- Respect `prefers-reduced-motion`

### Styling
- Tailwind CSS v4 with CSS-first configuration
- Mobile-first responsive design
- Font: Poppins (Google Fonts)
- Avoid generic "AI slop" aesthetics — no purple gradients, no Space Grotesk, no uniform rounded corners

### API Routes
- Voice chat uses Anthropic Claude SDK
- TTS uses ElevenLabs API
- Voice agent supports commands: `[SCROLL:section]`, `[NAVIGATE:/page]`, `[BOOK]`

---

## Environment Variables

Required in `.env.local`:
```
ANTHROPIC_API_KEY=       # Claude API for voice chat
GOOGLE_API_KEY=          # Google Generative AI
ELEVENLABS_API_KEY=      # ElevenLabs TTS
```

---

## Claude Brain — How to Use

Claude Brain is your **persistent memory across sessions**. It's an MCP tool that gives Claude long-term recall so context, decisions, and lessons learned carry forward automatically.

### Rules — Follow These Every Conversation

1. **At the start of every conversation**: Call `brain` to recall relevant context before answering
2. **When you learn something new**: Store it immediately — don't wait until the end
3. **When a decision is made**: Store it with `brain` right then
4. **When debugging**: Store what worked and what didn't
5. **Before ending a conversation**: Store a summary of what was discussed and decided

### What to Store

- **Decisions and reasoning**: "Chose GSAP over Framer Motion for scroll animations because..."
- **Architecture choices**: "Voice agent uses WebGL shaders for the 3D orb because..."
- **Bug patterns and fixes**: "Three.js components crash on SSR — always use dynamic import with ssr: false"
- **User preferences**: Design direction, tech choices, workflow preferences
- **Project milestones**: What was completed, what's next

### How to Call Brain

Just use the `brain` tool naturally — tell it what you're doing, what you decided, or what you need to recall:

```
brain("Decided to use ElevenLabs for TTS instead of Web Speech API because it sounds more natural")
brain("Fixed voice agent crash — was missing ssr: false on dynamic import of Three.js canvas")
brain("User prefers dark, premium aesthetic with violet accent colors for the brand")
brain("Recall what we decided about the pricing page structure")
```

### When NOT to Use Brain

- Don't store trivial implementation details (e.g., "added a div with class p-4")
- Don't store things already documented in CLAUDE.md or code comments
- Don't store sensitive data (API keys, passwords, personal information)

---

## Skills Available

This project has **10 custom skills** installed in `.claude/skills/`:

### For Front-End Developers
| Skill | Use When |
|-------|----------|
| `frontend-design` | Building new pages or components with distinctive design |
| `tailwindcss-v4` | Styling with Tailwind, responsive design, dark mode |
| `elite-frontend-ux` | SaaS dashboards, landing pages, accessibility, conversion optimization |
| `nextjs-app-router` | Working with Next.js routing, Server Components, data fetching, API routes |
| `threejs-development` | Building 3D scenes, shaders, voice agent orb, WebGL |
| `gsap-animations` | Scroll-triggered animations, timelines, text reveals |
| `typescript-patterns` | TypeScript types, generics, discriminated unions, type guards |

### For UI/UX Designers
| Skill | Use When |
|-------|----------|
| `ui-ux-design-system` | Design tokens, component architecture, UX patterns, responsive guidelines |

### For SEO Specialists
| Skill | Use When |
|-------|----------|
| `seo-optimization` | Metadata, structured data, sitemap, robots.txt, Core Web Vitals, E-E-A-T |
| `content-marketing` | Copywriting, CTAs, conversion optimization, landing page copy, blog strategy |

---

## History Tracking

After making changes, create or update a history file at `HISTORY.md` with patches of past changes. Include:
- Date of change
- Brief description of what changed
- Files modified
- Reason for the change

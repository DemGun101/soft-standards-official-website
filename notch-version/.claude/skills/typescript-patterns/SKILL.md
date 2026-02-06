---
name: typescript-patterns
description: "TypeScript best practices and patterns for Next.js applications. Use when writing TypeScript code, defining types, creating interfaces, or working with generics and type safety in the codebase."
---

# TypeScript Patterns for Next.js

## Core Principles

1. **Strict mode always** — Enable `strict: true` in tsconfig.json
2. **Types over interfaces for unions** — Use `type` for unions and intersections, `interface` for objects that may be extended
3. **No `any`** — Use `unknown` when the type is truly unknown, then narrow with type guards
4. **Const assertions** — Use `as const` for literal types and readonly arrays

## Component Props

```tsx
// Define props with interface for extensibility
interface ButtonProps {
  variant: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

// Use React.FC sparingly — prefer explicit return types
export function Button({ variant, size = "md", isLoading, children, onClick }: ButtonProps) {
  return <button onClick={onClick}>{isLoading ? "Loading..." : children}</button>;
}
```

## API Route Types

```tsx
// Types for API request/response
interface VoiceChatRequest {
  message: string;
  conversationHistory: ConversationMessage[];
  scrollContext?: string;
}

interface VoiceChatResponse {
  reply: string;
  commands?: VoiceCommand[];
}

type VoiceCommand =
  | { type: "scroll"; target: string }
  | { type: "navigate"; path: string }
  | { type: "book" };
```

## Discriminated Unions

```tsx
type ServiceTier =
  | { plan: "starter"; price: 499; features: string[] }
  | { plan: "growth"; price: 999; features: string[]; priority: boolean }
  | { plan: "enterprise"; price: null; features: string[]; dedicated: boolean };

function getPriceDisplay(tier: ServiceTier): string {
  switch (tier.plan) {
    case "starter": return `$${tier.price}/mo`;
    case "growth": return `$${tier.price}/mo`;
    case "enterprise": return "Custom";
  }
}
```

## Type Guards

```tsx
function isVoiceCommand(value: unknown): value is VoiceCommand {
  return (
    typeof value === "object" &&
    value !== null &&
    "type" in value &&
    typeof (value as VoiceCommand).type === "string"
  );
}
```

## Generic Patterns

```tsx
// Generic fetch wrapper with type safety
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(endpoint, options);
  if (!response.ok) throw new Error(`API Error: ${response.status}`);
  return response.json() as Promise<T>;
}

// Usage
const data = await fetchAPI<VoiceChatResponse>("/api/voice/chat", {
  method: "POST",
  body: JSON.stringify(request),
});
```

## Utility Types

```tsx
// Pick specific fields
type BlogPreview = Pick<BlogPost, "title" | "excerpt" | "slug" | "date">;

// Omit fields
type CreatePost = Omit<BlogPost, "id" | "createdAt" | "updatedAt">;

// Partial for updates
type UpdatePost = Partial<CreatePost>;

// Record for maps
type ServicePricing = Record<string, number>;

// Extract from union
type ScrollCommand = Extract<VoiceCommand, { type: "scroll" }>;
```

## Best Practices

1. **Export types from a central `types/` directory** for shared types
2. **Co-locate component-specific types** with their components
3. **Use `satisfies` operator** for type checking without widening
4. **Prefer `unknown` over `any`** — forces explicit type narrowing
5. **Use template literal types** for string patterns:
   ```tsx
   type Route = `/${string}`;
   type CSSVariable = `--${string}`;
   ```
6. **Avoid type assertions (`as`)** — Use type guards instead
7. **Use `readonly` for immutable data** — Arrays, objects, and class properties

---
name: ai-elements
description: 'AI Elements component library for building AI chat interfaces. Use when: (1) Building chat UI components, (2) Creating AI-powered conversation interfaces, (3) Working with shadcn/ui for AI apps. Triggers on: "AI Elements", "chat components", "message component", "conversation UI", "AI chat interface".'
---

# AI Elements

AI Elements is a component library built on shadcn/ui for AI-native applications.

## Installation

```bash
npx ai-elements@latest
```

Or via shadcn/ui CLI:

```bash
npx shadcn@latest add "https://ai-elements.dev/r/message"
```

## Prerequisites

- Node.js 18+
- Next.js with AI SDK
- shadcn/ui installed
- Recommended: AI Gateway API key (`AI_GATEWAY_API_KEY` in `.env.local`)

## Basic Usage

```tsx
'use client';

import {
  Message,
  MessageContent,
  MessageResponse,
} from '@/components/ai-elements/message';
import { useChat } from '@ai-sdk/react';

const ChatInterface = () => {
  const { messages } = useChat();

  return (
    <>
      {messages.map(({ role, parts }, index) => (
        <Message from={role} key={index}>
          <MessageContent>
            {parts.map((part, i) => {
              switch (part.type) {
                case 'text':
                  return (
                    <MessageResponse key={`${role}-${i}`}>
                      {part.text}
                    </MessageResponse>
                  );
              }
            })}
          </MessageContent>
        </Message>
      ))}
    </>
  );
};

export default ChatInterface;
```

## Component Structure

Components are installed to `@/components/ai-elements/` by default.

### Message Component

```tsx
import {
  Message,
  MessageContent,
  MessageResponse,
  MessageAvatar,
} from '@/components/ai-elements/message';

<Message from="user">
  <MessageAvatar />
  <MessageContent>
    <MessageResponse>Hello!</MessageResponse>
  </MessageContent>
</Message>
```

## Extensibility

All components extend primitive HTML attributes:

```tsx
// Message extends HTMLAttributes<HTMLDivElement>
<Message
  from="assistant"
  className="custom-class"
  onClick={handleClick}
>
  {/* content */}
</Message>
```

## Customization

Components are added to your codebase - modify them directly:

```tsx
// components/ai-elements/message.tsx
export const MessageContent = ({
  children,
  className,
  ...props
}: MessageContentProps) => (
  <div
    className={cn(
      'flex flex-col gap-2 text-sm text-foreground',
      // Remove rounded-lg to customize styling
      'group-[.is-user]:bg-primary group-[.is-user]:text-primary-foreground',
      className,
    )}
    {...props}
  >
    {children}
  </div>
);
```

## Tailwind 4 Setup

Ensure your `globals.css` imports Tailwind and includes shadcn/ui base styles:

```css
@import "tailwindcss";
/* shadcn/ui base styles */
```

## TypeScript Configuration

Ensure proper path aliases in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## Integration with AI SDK

Works seamlessly with Vercel AI SDK's `useChat`:

```tsx
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';

const { messages, sendMessage } = useChat({
  transport: new DefaultChatTransport({ api: '/api/chat' }),
});
```

## Troubleshooting

### Components not styled?
- Verify Tailwind 4 + shadcn/ui configuration
- Check `globals.css` imports

### Module not found?
- Verify `tsconfig.json` path aliases
- Check component file exists in `@/components/ai-elements/`

### Theme switching not working?
- Ensure `data-theme` attribute on `<html>` element
- Check Tailwind config for class/data selectors

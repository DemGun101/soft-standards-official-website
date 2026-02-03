---
name: vercel-ai-sdk
description: 'Vercel AI SDK best practices for building AI-powered applications. Use when: (1) Implementing AI features with generateText, streamText, or agents, (2) Using AI providers (OpenAI, Anthropic, Google), (3) Building chatbots with useChat, (4) Structured output or tool calling. Triggers on: "AI SDK", "Vercel AI", "generateText", "streamText", "useChat", "AI agent", "tool calling", "structured output".'
---

# Vercel AI SDK Best Practices

## Installation

```bash
npm install ai @ai-sdk/openai @ai-sdk/anthropic @ai-sdk/google
```

## Critical: Do Not Trust Internal Knowledge

AI SDK APIs change frequently. Always:

1. Check `node_modules/ai/docs/` for current APIs
2. Search ai-sdk.dev documentation
3. Run typecheck after changes
4. Never rely on memory - verify against source

## Core Functions

### generateText

```typescript
import { generateText } from 'ai';

const result = await generateText({
  model: 'anthropic/claude-sonnet-4.5',
  maxOutputTokens: 512,  // NOT maxTokens (deprecated)
  prompt: 'Write a short story',
});

console.log(result.text);
```

### streamText

```typescript
import { streamText } from 'ai';

const result = streamText({
  model: 'anthropic/claude-sonnet-4.5',
  prompt: 'Write a poem',
});

for await (const chunk of result.textStream) {
  process.stdout.write(chunk);
}
```

## Structured Output (NOT generateObject)

`generateObject` is deprecated. Use `generateText` with `output`:

```typescript
import { generateText, Output } from 'ai';
import { z } from 'zod';

const result = await generateText({
  model: 'anthropic/claude-sonnet-4.5',
  output: Output.object({
    schema: z.object({
      recipe: z.object({
        name: z.string(),
        ingredients: z.array(z.string()),
      }),
    }),
  }),
  prompt: 'Generate a recipe for chocolate cake',
});

console.log(result.output); // Typed object
```

### Other Output Options

```typescript
// Array output
output: Output.array({
  element: z.object({
    city: z.string(),
    country: z.string(),
  }),
})

// Choice output
output: Output.choice({
  options: ['positive', 'negative', 'neutral'] as const,
})

// JSON output (untyped)
output: Output.json()
```

## Tool Calling

```typescript
import { generateText, tool } from 'ai';
import { z } from 'zod';

const weatherTool = tool({
  description: 'Get weather for a location',
  inputSchema: z.object({  // NOT parameters (deprecated)
    location: z.string(),
  }),
  execute: async ({ location }) => {
    return { temperature: 72, condition: 'sunny', location };
  },
});

const result = await generateText({
  model: 'anthropic/claude-sonnet-4.5',
  tools: { weather: weatherTool },
  stopWhen: stepCountIs(5),  // NOT maxSteps (deprecated)
  prompt: 'What is the weather in NYC?',
});
```

## Building Agents with ToolLoopAgent

```typescript
import { ToolLoopAgent, InferAgentUIMessage } from 'ai';
import { weatherTool } from './tools/weather-tool';

export const myAgent = new ToolLoopAgent({
  model: 'anthropic/claude-sonnet-4',
  instructions: 'You are a helpful assistant.',
  tools: {
    weather: weatherTool,
  },
});

// Export type for useChat
export type MyAgentUIMessage = InferAgentUIMessage<typeof myAgent>;
```

## useChat Hook (Updated API)

**IMPORTANT**: The useChat API has changed significantly.

```tsx
// OLD - Deprecated
const { input, handleInputChange, handleSubmit } = useChat({
  api: '/api/chat',
});

// NEW - Correct
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState } from 'react';

export default function Chat() {
  const [input, setInput] = useState('');
  const { sendMessage, messages } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage({ text: input });
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button type="submit">Send</button>
    </form>
  );
}
```

## API Route Response

```typescript
// OLD - Deprecated for useChat
return result.toDataStreamResponse();

// NEW - Correct
return result.toUIMessageStreamResponse();
```

## Rendering Tool Parts

```tsx
// OLD - Generic tool-invocation
case 'tool-invocation':
  return <div>{part.toolInvocation.args}</div>;

// NEW - Typed tool parts
case 'tool-weather':
  if (part.state === 'output-available') {
    return <div>Weather: {part.output.temperature}°F</div>;
  }
  return <div>Loading weather...</div>;
```

### Tool Part State Checking

```tsx
// input/output are only available in certain states
if (part.type === 'tool-weather' &&
    (part.state === 'input-available' || part.state === 'output-available')) {
  const location = part.input.location;
}

if (part.type === 'tool-weather' && part.state === 'output-available') {
  const weather = part.output;
}
```

## Vercel AI Gateway

The fastest way to get started - access multiple providers through one API:

```typescript
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'anthropic/claude-sonnet-4.5',  // Gateway format
  prompt: 'What is love?',
});
```

### Find Available Models

```bash
# List all models
curl https://ai-gateway.vercel.sh/v1/models

# Anthropic models
curl -s https://ai-gateway.vercel.sh/v1/models | jq -r '[.data[] | select(.id | startswith("anthropic/")) | .id] | reverse | .[]'
```

## Common Errors Reference

| Old API | New API |
|---------|---------|
| `maxTokens` | `maxOutputTokens` |
| `maxSteps` | `stopWhen: stepCountIs(n)` |
| `parameters` (tool) | `inputSchema` |
| `generateObject` | `generateText` with `output` |
| `toDataStreamResponse` | `toUIMessageStreamResponse` |
| `tool-invocation` | `tool-{toolName}` |
| `part.args` | `part.input` |
| `part.result` | `part.output` |
| `addToolResult` | `addToolOutput` |

## Type-Safe Agents

```typescript
// lib/agents/my-agent.ts
import { ToolLoopAgent, InferAgentUIMessage } from 'ai';

export const myAgent = new ToolLoopAgent({
  model: 'anthropic/claude-sonnet-4',
  tools: { weather: weatherTool },
});

export type MyAgentUIMessage = InferAgentUIMessage<typeof myAgent>;

// app/chat.tsx
import type { MyAgentUIMessage } from '@/lib/agents/my-agent';

const { messages } = useChat<MyAgentUIMessage>();
```

## Environment Variables

```env
AI_GATEWAY_API_KEY=your_api_key
# Or individual providers:
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_GENERATIVE_AI_API_KEY=...
```

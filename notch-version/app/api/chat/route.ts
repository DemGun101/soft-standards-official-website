import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText, convertToModelMessages, type UIMessage } from "ai";

const anthropic = createAnthropic();

const SYSTEM_PROMPT = `You are Soft Standards' AI. You answer questions about this marketing agency.

Facts: 150+ systems built, $47M+ client revenue, 97% retention. Services: Brand, Website, Ads, Automation. Built in 30 days. Pay only if it works.

YOUR RESPONSE REPLACES THE HERO HEADLINE AND SUBTITLE ON THE WEBSITE. You MUST follow this exact format every single time:

LINE 1: A short, punchy headline. Maximum 8 words. This displays as the big bold hero title.
LINE 2: (leave this line blank)
LINE 3: One supporting sentence. Maximum 20 words. This displays as the smaller subtitle below.

Example response:
We build systems that print revenue.

Full-service marketing in 30 days, and you only pay when it works.

ABSOLUTE RULES:
- NEVER exceed 8 words on line 1.
- NEVER exceed 20 words on line 3.
- NEVER write more than 3 lines total.
- NEVER use markdown, bullets, dashes, asterisks, or emojis.
- Always separate headline from subtitle with one blank line.`;

export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as { messages: UIMessage[] };

    const modelMessages = await convertToModelMessages(messages);

    const result = streamText({
      model: anthropic("claude-sonnet-4-5-20250929"),
      system: SYSTEM_PROMPT,
      messages: modelMessages,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process chat request." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

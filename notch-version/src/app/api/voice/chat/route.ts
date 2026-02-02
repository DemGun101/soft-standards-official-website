import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { generateSystemPrompt } from "@/data/voice-agent-context";
import { voiceAgentConfig, ConversationMessage, VoiceCommand } from "@/lib/voice-agent-config";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

function parseCommand(text: string): VoiceCommand {
  // Check for navigation command
  const navigateMatch = text.match(/\[NAVIGATE:(\/[^\]]*)\]/);
  if (navigateMatch) {
    return { type: "navigate", target: navigateMatch[1] };
  }

  // Check for booking command
  if (text.includes("[BOOK]")) {
    return { type: "book", target: voiceAgentConfig.bookingUrl };
  }

  return { type: null };
}

function cleanResponseText(text: string): string {
  // Remove command tags from the response text for TTS
  return text
    .replace(/\[NAVIGATE:[^\]]*\]/g, "")
    .replace(/\[BOOK\]/g, "")
    .trim();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, conversationHistory = [] } = body as {
      message: string;
      conversationHistory: ConversationMessage[];
    };

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Build messages array for Claude
    const messages: Anthropic.MessageParam[] = [
      ...conversationHistory.map((msg) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
      { role: "user", content: message },
    ];

    // Call Claude API
    const response = await anthropic.messages.create({
      model: voiceAgentConfig.llm.model,
      max_tokens: voiceAgentConfig.llm.maxTokens,
      temperature: voiceAgentConfig.llm.temperature,
      system: generateSystemPrompt(),
      messages,
    });

    // Extract text from response
    const responseText =
      response.content[0].type === "text" ? response.content[0].text : "";

    // Parse any commands from the response
    const command = parseCommand(responseText);

    // Clean the response text for TTS (remove command tags)
    const cleanText = cleanResponseText(responseText);

    return NextResponse.json({
      response: cleanText,
      command,
      rawResponse: responseText,
    });
  } catch (error) {
    console.error("Voice chat API error:", error);

    if (error instanceof Anthropic.APIError) {
      return NextResponse.json(
        { error: `API error: ${error.message}` },
        { status: error.status || 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to process voice chat request" },
      { status: 500 }
    );
  }
}

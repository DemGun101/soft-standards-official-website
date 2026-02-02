import { NextRequest, NextResponse } from "next/server";
import { voiceAgentConfig } from "@/lib/voice-agent-config";

const ELEVEN_LABS_API_URL = "https://api.elevenlabs.io/v1/text-to-speech";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, voiceId } = body as { text: string; voiceId?: string };

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.ELEVEN_LABS_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Eleven Labs API key not configured" },
        { status: 500 }
      );
    }

    const selectedVoiceId = voiceId || voiceAgentConfig.tts.voiceId;

    // Call Eleven Labs API
    const response = await fetch(
      `${ELEVEN_LABS_API_URL}/${selectedVoiceId}/stream`,
      {
        method: "POST",
        headers: {
          "Accept": "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": apiKey,
        },
        body: JSON.stringify({
          text,
          model_id: voiceAgentConfig.tts.modelId,
          voice_settings: {
            stability: voiceAgentConfig.tts.stability,
            similarity_boost: voiceAgentConfig.tts.similarityBoost,
            style: voiceAgentConfig.tts.style,
            use_speaker_boost: voiceAgentConfig.tts.speakerBoost,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Eleven Labs API error:", errorText);
      return NextResponse.json(
        { error: `TTS API error: ${response.statusText}` },
        { status: response.status }
      );
    }

    // Stream the audio response
    const audioBuffer = await response.arrayBuffer();

    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.byteLength.toString(),
      },
    });
  } catch (error) {
    console.error("TTS API error:", error);
    return NextResponse.json(
      { error: "Failed to generate speech" },
      { status: 500 }
    );
  }
}

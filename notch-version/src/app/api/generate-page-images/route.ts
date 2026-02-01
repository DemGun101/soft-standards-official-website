import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { GoogleGenAI } from '@google/genai';

interface ImageSpec {
  filename: string;
  prompt: string;
  directory: string;
}

const IMAGE_SPECS: ImageSpec[] = [
  // Case Studies
  {
    filename: 'spacedome-ai.png',
    directory: 'case-studies',
    prompt: 'Modern AI web platform interface design mockup. Futuristic tech UI with purple and blue gradients, clean typography, dashboard elements, data visualization. Professional, sleek, high-tech aesthetic. 4:3 aspect ratio.'
  },
  {
    filename: 'bicycle-health.png',
    directory: 'case-studies',
    prompt: 'Healthcare digital marketing campaign visual. Warm, friendly, trustworthy design with teal and green colors. Focus on patient care, wellness, modern medical interface. Clean, professional, approachable. 4:3 aspect ratio.'
  },
  {
    filename: 'meridian-consulting.png',
    directory: 'case-studies',
    prompt: 'Professional consulting firm branding mockup. Sophisticated business materials, navy blue and gold colors, corporate identity system, elegant typography. Premium, trustworthy, established. 4:3 aspect ratio.'
  },
  {
    filename: 'trellis-studios.png',
    directory: 'case-studies',
    prompt: 'Modern e-commerce platform design. Product showcase, shopping interface, clean layout with earth tones and natural colors. User-friendly, elegant, conversion-focused design. 4:3 aspect ratio.'
  },
  {
    filename: 'apex-ventures.png',
    directory: 'case-studies',
    prompt: 'Investment platform interface for venture capital. Financial dashboard, data charts, modern fintech UI with deep blue and silver accents. Professional, data-driven, sophisticated. 4:3 aspect ratio.'
  },
  {
    filename: 'horizon-wellness.png',
    directory: 'case-studies',
    prompt: 'Wellness brand growth campaign visual. Calming spa-like design, soft pastels, mindfulness and health imagery, modern wellness branding. Peaceful, aspirational, premium. 4:3 aspect ratio.'
  },
  // Avatars for testimonials
  {
    filename: 'james-thornton.png',
    directory: 'case-studies',
    prompt: 'Professional headshot style portrait of a tech founder, male, 35-40 years old, confident, modern business casual, neutral background. Photorealistic, professional, approachable.'
  },
  {
    filename: 'rachel-kim.png',
    directory: 'case-studies',
    prompt: 'Professional headshot style portrait of a female healthcare executive, 40-45 years old, warm smile, professional attire, neutral background. Photorealistic, trustworthy, compassionate.'
  },
  {
    filename: 'daniel-porter.png',
    directory: 'case-studies',
    prompt: 'Professional headshot style portrait of a male managing director, 45-50 years old, business suit, confident expression, neutral background. Photorealistic, executive, authoritative.'
  },
  {
    filename: 'sarah-lin.png',
    directory: 'case-studies',
    prompt: 'Professional headshot style portrait of a female entrepreneur, 30-35 years old, creative professional, friendly smile, modern setting. Photorealistic, creative, energetic.'
  },
  // Homepage hero
  {
    filename: 'hero-gradient.png',
    directory: 'homepage',
    prompt: 'Abstract modern digital gradient background. Flowing purple and blue waves, soft bokeh lights, tech-inspired patterns, AI and innovation theme. Minimalist, professional, futuristic. 16:9 aspect ratio.'
  },
  {
    filename: 'ai-automation-visual.png',
    directory: 'homepage',
    prompt: 'AI automation concept illustration. Abstract neural network, connected nodes, flowing data, purple and blue color scheme. Modern, tech-forward, innovative. Clean, professional design. 16:9 aspect ratio.'
  },
];

async function generateImage(
  prompt: string,
  filename: string,
  directory: string,
  apiKey: string
): Promise<boolean> {
  try {
    console.log(`Generating: ${directory}/${filename}`);

    const client = new GoogleGenAI({ apiKey });

    const response = await client.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const generatedImage = response.generatedImages[0];

      if (generatedImage.image?.imageBytes) {
        const imageData = generatedImage.image.imageBytes;
        const buffer = Buffer.from(imageData, 'base64');

        const imagesDir = join(process.cwd(), 'public', 'images', directory);
        await mkdir(imagesDir, { recursive: true });

        const filepath = join(imagesDir, filename);
        await writeFile(filepath, buffer);

        console.log(`✓ Saved: ${directory}/${filename}`);
        return true;
      }
    }

    console.warn(`✗ No image data for: ${directory}/${filename}`);
    return false;
  } catch (error) {
    console.error(`✗ Error generating ${directory}/${filename}:`, error);
    return false;
  }
}

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.GOOGLE_AI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { success: false, message: 'GOOGLE_AI_API_KEY not configured' },
        { status: 500 }
      );
    }

    console.log(`Starting generation of ${IMAGE_SPECS.length} page images...`);

    let successCount = 0;
    let failCount = 0;

    for (const spec of IMAGE_SPECS) {
      const success = await generateImage(
        spec.prompt,
        spec.filename,
        spec.directory,
        apiKey
      );

      if (success) {
        successCount++;
      } else {
        failCount++;
      }

      // Delay between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    console.log(`\nGeneration complete: ${successCount} success, ${failCount} failed`);

    return NextResponse.json({
      success: true,
      message: 'Page images generated successfully',
      generated: successCount,
      failed: failCount,
      total: IMAGE_SPECS.length,
    }, { status: 200 });
  } catch (error) {
    console.error('Error in page images generation:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to generate page images',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

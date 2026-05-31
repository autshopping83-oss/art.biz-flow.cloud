import { API_ROUTE } from '@utils/constants';

export type GeminiPromptRequest = {
  type: 'theme' | 'wallpaper';
  description: string;
};

export type GeminiPromptResponse = {
  prompt: string;
  negativePrompt?: string;
  metadata?: {
    palette: string[];
    typography: string;
    style: string;
  };
};

export async function fetchGeminiPrompt(body: GeminiPromptRequest) {
  const response = await fetch(API_ROUTE.CREATE_PROMPT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error('Falha ao gerar prompt com Gemini.');
  }

  return (await response.json()) as { data: GeminiPromptResponse };
}

export type ImagenResponse = {
  imageUrl: string;
  seed: string;
};

export async function fetchImagenGeneration(prompt: string, seed?: string) {
  const response = await fetch(API_ROUTE.GENERATE_WALLPAPER, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, seed })
  });

  if (!response.ok) {
    throw new Error('Falha ao gerar wallpaper com Imagen.');
  }

  return (await response.json()) as { data: ImagenResponse };
}

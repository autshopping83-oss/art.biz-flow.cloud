import { useState } from 'react';
import { fetchGeminiPrompt, fetchImagenGeneration } from '@services/googleAI';
import { supabaseClient } from '@services/supabaseClient';

export function useCreateWallpaper() {
  const [prompt, setPrompt] = useState('');
  const [metadata, setMetadata] = useState<Record<string, unknown> | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [seed, setSeed] = useState('');
  const [loading, setLoading] = useState(false);

  async function createPrompt(type: 'theme' | 'wallpaper', description: string) {
    setLoading(true);
    const { data } = await fetchGeminiPrompt({ type, description });
    setLoading(false);
    setPrompt(data.prompt);
    setMetadata(data.metadata ?? null);
    return data;
  }

  async function generateImage(optimizedPrompt: string, repeatSeed?: string) {
    setLoading(true);
    const { data } = await fetchImagenGeneration(optimizedPrompt, repeatSeed);
    setLoading(false);
    setImageUrl(data.imageUrl);
    setSeed(data.seed);
    return data;
  }

  async function publishWallpaper(userId: string, type: 'theme' | 'wallpaper') {
    if (!imageUrl) {
      throw new Error('Nenhuma imagem disponível para publicar.');
    }

    const { error } = await supabaseClient.from('creations').insert([{
      user_id: userId,
      type,
      image_url: imageUrl,
      metadata,
      is_public: true
    }]);

    if (error) throw error;
  }

  return {
    prompt,
    metadata,
    imageUrl,
    seed,
    loading,
    setPrompt,
    createPrompt,
    generateImage,
    publishWallpaper
  };
}

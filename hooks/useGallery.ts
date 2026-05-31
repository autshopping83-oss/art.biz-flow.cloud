import { useEffect, useState } from 'react';
import { supabaseClient } from '@services/supabaseClient';

export type GalleryItem = {
  id: string;
  type: 'theme' | 'wallpaper';
  image_url: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
};

const PAGE_SIZE = 12;

export function useGallery(type: 'theme' | 'wallpaper') {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadPage(0).catch(console.error);
  }, [type]);

  async function loadPage(offset: number) {
    setLoading(true);
    const { data, error } = await supabaseClient
      .from('creations')
      .select('id,type,image_url,metadata,created_at')
      .eq('type', type)
      .eq('is_public', true)
      .order('created_at', { ascending: false })
      .range(offset, offset + PAGE_SIZE - 1);

    setLoading(false);
    if (error) throw error;

    const nextItems = data as GalleryItem[];
    setItems(offset === 0 ? nextItems : prev => [...prev, ...nextItems]);
    setHasMore(nextItems.length === PAGE_SIZE);
    setPage(offset / PAGE_SIZE + 1);
  }

  function loadMore() {
    if (!hasMore || loading) return;
    loadPage(page * PAGE_SIZE).catch(console.error);
  }

  return { items, loading, hasMore, loadMore };
}

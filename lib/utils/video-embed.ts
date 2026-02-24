/**
 * YouTube video ID'sini URL'den çıkarır.
 */
function getYouTubeVideoId(url: string): string | null {
  if (!url?.trim()) return null;
  const u = url.trim();
  const m =
    u.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/) ??
    u.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}

/**
 * Video URL'den önizleme (thumbnail) resmi URL'si döner.
 * YouTube için img.youtube.com kullanır.
 */
export function getVideoThumbnailUrl(url: string): string | null {
  const ytId = getYouTubeVideoId(url);
  if (ytId) return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
  return null;
}

/**
 * Video URL'den embed iframe src üretir.
 * YouTube ve Vimeo desteklenir.
 */
export function getVideoEmbedSrc(url: string): string | null {
  if (!url?.trim()) return null;

  const u = url.trim();

  const youtubeMatch =
    u.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/) ??
    u.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
  }

  const vimeoMatch = u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  return null;
}

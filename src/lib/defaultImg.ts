export const getDefaultImg = (
  url?: string,
  fallback: string = '/imgs/default.png'
) => {
  if (!url) return fallback;

  // Deezer 기본 이미지 (empty hash)
  const isDefault = url.includes('d41d8cd98f00b204e9800998ecf8427e');

  return isDefault ? fallback : url;
};
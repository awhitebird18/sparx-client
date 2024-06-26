export function transformCloudinaryUrl(
  url: string | undefined,
  width: number,
  height: number,
): string {
  if (!url) return '';
  const parts = url.split('/');

  parts.splice(6, 0, `w_${width},h_${height},c_fill`);

  return parts.join('/');
}

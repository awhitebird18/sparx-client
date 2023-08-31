export function setFavicon(src = '/favicon.ico') {
  const link = document.querySelector('link[rel*="icon"]') as HTMLLinkElement;

  link.href = src;
}

export function getSafePdfUrl(url: string): string {
  const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (fileIdMatch) {
    return `/api/proxy-pdf?fileId=${fileIdMatch[1]}`;
  }

  return url;
}

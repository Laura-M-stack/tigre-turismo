const KEY = "tigre:favs:v1";

export function getFavs(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function setFavs(slugs: string[]) {
  localStorage.setItem(KEY, JSON.stringify(slugs));
}

export function toggleFav(slug: string): string[] {
  const curr = new Set(getFavs());
  if (curr.has(slug)) curr.delete(slug);
  else curr.add(slug);
  const next = Array.from(curr);
  setFavs(next);
  return next;
}

const SITE = "Tigre Turismo";

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let meta = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attr, key);
    document.head.appendChild(meta);
  }
  meta.content = content;
}

export function setSEO(title: string, description?: string) {
  const full = title.includes(SITE) ? title : `${title} — ${SITE}`;
  document.title = full;
  upsertMeta("property", "og:title", full);
  upsertMeta("name", "twitter:title", full);

  if (!description) return;
  upsertMeta("name", "description", description);
  upsertMeta("property", "og:description", description);
  upsertMeta("name", "twitter:description", description);
}

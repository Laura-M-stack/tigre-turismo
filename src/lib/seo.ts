export function setSEO(title: string, description?: string) {
  document.title = title;

  if (description) {
    let meta = document.querySelector(
      'meta[name="description"]',
    ) as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;
  }
}

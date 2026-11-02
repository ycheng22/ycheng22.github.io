// GitHub-style heading slugs so in-post TOC links like [Foo](#foo-bar) resolve.
// Applied to the rendered DOM because Angular's sanitizer strips id attributes from markdown HTML.
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s_-]/gu, '')
    .replace(/\s/g, '-');
}

export function addHeadingIds(root: HTMLElement): void {
  const seen = new Map<string, number>();
  root.querySelectorAll<HTMLElement>('h1, h2, h3, h4, h5, h6').forEach((heading) => {
    const base = slugify(heading.textContent ?? '');
    if (!base) return;
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    heading.id = count ? `${base}-${count}` : base;
  });
}

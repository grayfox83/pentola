const PLAY_SLUG_RE = /^[a-z]+$/;

/** Безопасное имя файла в `public/plays/*.json` — только строчные латинские буквы. */
export function parsePlaySlug(raw: string | null): string | null {
  if (typeof raw !== "string" || !PLAY_SLUG_RE.test(raw)) return null;
  return raw;
}

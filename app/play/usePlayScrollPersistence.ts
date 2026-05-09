import { useLayoutEffect, useRef, useEffect } from "react";

const LS_SCROLL_PREFIX = "pentola:play:scrollY:";

function scrollKey(slug: string) {
  return LS_SCROLL_PREFIX + slug;
}

function readStoredY(slug: string): number | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(scrollKey(slug));
    if (raw == null) return null;
    const y = parseInt(raw, 10);
    if (!Number.isFinite(y) || y < 0) return null;
    return y;
  } catch {
    return null;
  }
}

function clampScrollY(y: number): number {
  const maxY = Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight,
  );
  return Math.min(y, maxY);
}

function applyScroll(y: number) {
  window.scrollTo(0, clampScrollY(y));
}

/** Сохраняет вертикальный скролл окна для пьесы и восстанавливает после перезагрузки. */
export function usePlayScrollPersistence(slug: string) {
  const slugRef = useRef(slug);
  const restoredRef = useRef(false);

  useLayoutEffect(() => {
    if (slugRef.current !== slug) {
      slugRef.current = slug;
      restoredRef.current = false;
    }
    if (restoredRef.current) return;

    const y = readStoredY(slug);
    restoredRef.current = true;
    if (y == null) {
      return () => {
        restoredRef.current = false;
      };
    }

    applyScroll(y);
    requestAnimationFrame(() => applyScroll(y));

    return () => {
      restoredRef.current = false;
    };
  }, [slug]);

  useEffect(() => {
    const key = scrollKey(slug);
    let debounceId: ReturnType<typeof setTimeout> | null = null;

    const persist = () => {
      try {
        window.localStorage.setItem(key, String(window.scrollY));
      } catch {
        /* quota */
      }
    };

    const onScroll = () => {
      if (debounceId != null) clearTimeout(debounceId);
      debounceId = setTimeout(() => {
        debounceId = null;
        persist();
      }, 120);
    };

    const flush = () => {
      if (debounceId != null) {
        clearTimeout(debounceId);
        debounceId = null;
      }
      persist();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pagehide", flush);
    const onVis = () => {
      if (document.visibilityState === "hidden") flush();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", flush);
      document.removeEventListener("visibilitychange", onVis);
      flush();
    };
  }, [slug]);
}

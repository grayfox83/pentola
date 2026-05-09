"use client";

import { useCallback, useEffect, useState } from "react";

const SHOW_AFTER = 120;

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  const update = useCallback(() => {
    setVisible(window.scrollY > SHOW_AFTER);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [update]);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Прокрутить в начало"
      className="fixed right-3 top-3 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white shadow-md backdrop-blur-sm transition hover:bg-black/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 md:right-5 md:top-5"
      onClick={() =>
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}

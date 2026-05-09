"use client";

import Link from "next/link";

const btnClass =
  "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white shadow-md backdrop-blur-sm transition hover:bg-black/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60";

export function BackNavLink({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="На главную"
      className={[btnClass, className].filter(Boolean).join(" ")}
      scroll
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
        <path d="M15 6l-6 6 6 6" />
      </svg>
    </Link>
  );
}

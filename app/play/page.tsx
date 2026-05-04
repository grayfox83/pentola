"use client";

import { Play } from "../ui/play";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, Suspense } from "react";
import Link from "next/link";
import { parsePlaySlug } from "../lib/parsePlaySlug";
import type { LineInterface } from "../interfaces/LineInterface";
import type { RoleInterface } from "../interfaces/RoleInterface";

type PlayDocument = {
  title: string;
  roles: RoleInterface[];
  lines: LineInterface[];
};

function PlayPageInner() {
  const searchParams = useSearchParams();
  const slug = useMemo(
    () => parsePlaySlug(searchParams.get("name")),
    [searchParams],
  );

  const [data, setData] = useState<PlayDocument | null>(null);
  const [loading, setLoading] = useState(slug !== null);

  useEffect(() => {
    if (slug === null) {
      setData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setData(null);
    const ac = new AbortController();
    const url = `plays/${slug}.json?t=${Date.now()}`;

    fetch(url, { signal: ac.signal })
      .then(async (r) => {
        if (!r.ok) throw new Error(String(r.status));
        return (await r.json()) as PlayDocument;
      })
      .then(setData)
      .catch((e) => {
        if (e.name === "AbortError") return;
        setData(null);
      })
      .finally(() => {
        if (!ac.signal.aborted) setLoading(false);
      });

    return () => ac.abort();
  }, [slug]);

  if (slug === null) {
    return (
      <div className="m-4 flex flex-col gap-3">
        <p>Укажите корректное имя пьесы в адресе (только латиница a–z).</p>
        <Link
          className="font-medium text-blue-600 dark:text-blue-500"
          href="/"
        >
          НАЗАД
        </Link>
      </div>
    );
  }

  if (loading) return <div className="m-4">Загрузка...</div>;
  if (!data) {
    return (
      <div className="m-4 flex flex-col gap-3">
        <p>Не удалось загрузить пьесу.</p>
        <Link
          className="font-medium text-blue-600 dark:text-blue-500"
          href="/"
        >
          НАЗАД
        </Link>
      </div>
    );
  }

  return (
    <div className="m-1 flex flex-col">
      <Link
        className="ml-3 mt-3 font-medium text-blue-600 dark:text-blue-500"
        href="/"
      >
        НАЗАД
      </Link>
      <Play play={data} />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="m-4">Загрузка...</div>}>
      <PlayPageInner />
    </Suspense>
  );
}

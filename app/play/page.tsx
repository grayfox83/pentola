"use client";

import { Play } from "../ui/play";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, Suspense } from "react";
import { BackNavLink } from "../ui/BackNavLink";
import { parsePlaySlug } from "../lib/parsePlaySlug";
import type { LineInterface } from "../interfaces/LineInterface";
import type { RoleInterface } from "../interfaces/RoleInterface";
import { usePlayScrollPersistence } from "./usePlayScrollPersistence";

type PlayDocument = {
  title: string;
  roles: RoleInterface[];
  lines: LineInterface[];
};

function PlayLoadedView({
  slug,
  data,
}: {
  slug: string;
  data: PlayDocument;
}) {
  usePlayScrollPersistence(slug);
  return (
    <div className="m-1 flex flex-col">
      <BackNavLink className="ml-3 mt-3" />
      <Play key={slug} play={data} playSlug={slug} />
    </div>
  );
}

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
        <BackNavLink />
        <p>Укажите корректное имя пьесы в адресе (только латиница a–z).</p>
      </div>
    );
  }

  if (loading) return <div className="m-4">Загрузка...</div>;
  if (!data) {
    return (
      <div className="m-4 flex flex-col gap-3">
        <BackNavLink />
        <p>Не удалось загрузить пьесу.</p>
      </div>
    );
  }

  return <PlayLoadedView slug={slug} data={data} />;
}

export default function Page() {
  return (
    <Suspense fallback={<div className="m-4">Загрузка...</div>}>
      <PlayPageInner />
    </Suspense>
  );
}

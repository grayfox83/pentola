"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Line } from "./line";
import type { LineInterface } from "../interfaces/LineInterface";
import type { RoleInterface } from "../interfaces/RoleInterface";
import { lineRoleIds } from "../lib/lineRoleIds";

const LS_KEY_PREFIX = "pentola:play:selectedRoles:";

function loadRoleSelection(slug: string, validIds: Set<number>): Set<number> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(LS_KEY_PREFIX + slug);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return new Set();
    const next = new Set<number>();
    for (const x of parsed) {
      if (typeof x === "number" && Number.isInteger(x) && validIds.has(x)) {
        next.add(x);
      }
    }
    return next;
  } catch {
    return new Set();
  }
}

function saveRoleSelection(slug: string, ids: Set<number>) {
  if (typeof window === "undefined") return;
  try {
    const sorted = [...ids].sort((a, b) => a - b);
    window.localStorage.setItem(
      LS_KEY_PREFIX + slug,
      JSON.stringify(sorted),
    );
  } catch {
    /* quota / private mode */
  }
}

function lineRoleLabel(ids: number[], roles: Record<number, string>): string {
  return ids.map((id) => roles[id] ?? "—").join(" / ");
}

export function Play({
  play,
  playSlug,
}: {
  play: {
    title: string;
    roles: RoleInterface[];
    lines: LineInterface[];
  };
  /** Slug из URL (`?name=…`); без него выбор в localStorage не сохраняется. */
  playSlug?: string;
}) {
  const validRoleIds = useMemo(
    () => new Set(play.roles.map((r) => r.id)),
    [play.roles],
  );

  const [selectedRoleIds, setSelectedRoleIds] = useState<Set<number>>(() => {
    if (!playSlug) return new Set();
    return loadRoleSelection(playSlug, validRoleIds);
  });

  useEffect(() => {
    if (!playSlug) return;
    saveRoleSelection(playSlug, selectedRoleIds);
  }, [playSlug, selectedRoleIds]);

  const toggleRoleSelection = useCallback((roleId: number) => {
    setSelectedRoleIds((prev) => {
      const next = new Set(prev);
      if (next.has(roleId)) next.delete(roleId);
      else next.add(roleId);
      return next;
    });
  }, []);

  const resetSelection = useCallback(() => {
    setSelectedRoleIds(new Set());
  }, []);

  const roles =
    play.roles?.reduce<Record<number, string>>((acc, role) => {
      acc[role.id] = role.name;
      return acc;
    }, {}) ?? {};

  const lineHighlighted = useCallback(
    (ids: number[]) =>
      ids.length > 0 && ids.some((id) => selectedRoleIds.has(id)),
    [selectedRoleIds],
  );

  return (
    <div className={"flex w-9/10 flex-col justify-center"}>
      <h1 className={"mb-3 mt-3 flex justify-center p-3 text-2xl"}>
        {play.title}:
      </h1>
      <div className={"roles inline-block"}>
        {play.roles
          .filter((role) => role.name)
          .map((role) => {
            const on = selectedRoleIds.has(role.id);
            return (
              <div
                className={
                  "role inline-block cursor-pointer hover:opacity-75" +
                  (on ? " highlight-role" : "")
                }
                key={role.id}
              >
                <div onClick={() => toggleRoleSelection(role.id)}>
                  [{role.name}]
                </div>
              </div>
            );
          })}
        <div
          className={"role inline-block cursor-pointer hover:opacity-75"}
          onClick={resetSelection}
        >
          [X]
        </div>
      </div>
      <div className={"flex flex-col justify-center"}>
        {play.lines?.map((line, index) => {
          const ids = lineRoleIds(line);
          return (
            <Line
              key={"line_" + index}
              roleIds={ids}
              roleLabel={lineRoleLabel(ids, roles)}
              line={line.line}
              highlighted={lineHighlighted(ids)}
            />
          );
        })}
      </div>
    </div>
  );
}

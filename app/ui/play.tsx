"use client";
import { Line } from "./line";
import type { LineInterface } from "../interfaces/LineInterface";
import type { RoleInterface } from "../interfaces/RoleInterface";
import { lineRoleIds } from "../lib/lineRoleIds";

const ROLE_ATTR = "data-role-id";
const ROLE_IDS_ATTR = "data-role-ids";

function parseRoleIdsAttr(raw: string | null): number[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => !Number.isNaN(n));
}

function highlightRole(roleId: number): void {
  document.querySelectorAll(`[${ROLE_ATTR}]`).forEach((elem) => {
    if (elem.getAttribute(ROLE_ATTR) === roleId.toString()) {
      elem.classList.toggle("highlight-role");
    }
  });
  document.querySelectorAll(`[${ROLE_IDS_ATTR}]`).forEach((elem) => {
    const ids = parseRoleIdsAttr(elem.getAttribute(ROLE_IDS_ATTR));
    if (ids.includes(roleId)) {
      elem.classList.toggle("highlight-role");
    }
  });
}

function resetHighlightRole() {
  document.querySelectorAll(".highlight-role").forEach((elem) => {
    elem.classList.remove("highlight-role");
  });
}

function lineRoleLabel(ids: number[], roles: Record<number, string>): string {
  return ids.map((id) => roles[id] ?? "—").join(" / ");
}

export function Play({
  play,
}: {
  play: {
    title: string;
    roles: RoleInterface[];
    lines: LineInterface[];
  };
}) {
  const roles =
    play.roles?.reduce<Record<number, string>>((acc, role) => {
      acc[role.id] = role.name;
      return acc;
    }, {}) ?? {};

  return (
    <div className={"flex w-9/10 flex-col justify-center"}>
      <h1 className={"mb-3 mt-3 flex justify-center p-3 text-2xl"}>
        {play.title}:
      </h1>
      <div className={"roles inline-block"}>
        {play.roles
          .filter((role) => role.name)
          .map((role) => {
            return (
              <div
                data-role-id={role.id}
                className={
                  "role inline-block cursor-pointer hover:opacity-75"
                }
                key={role.id}
              >
                <div onClick={() => highlightRole(role.id)}>
                  [{role.name}]
                </div>
              </div>
            );
          })}
        <div
          className={"role inline-block cursor-pointer hover:opacity-75"}
          onClick={() => resetHighlightRole()}
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
            />
          );
        })}
      </div>
    </div>
  );
}
import type { LineInterface } from "../interfaces/LineInterface";

/** Список id ролей для реплики: `roleIds` или одиночный `roleId` (всегда по возрастанию id). */
export function lineRoleIds(line: LineInterface): number[] {
  let ids: number[] = [];
  if (Array.isArray(line.roleIds) && line.roleIds.length > 0) {
    ids = line.roleIds;
  } else if (typeof line.roleId === "number") {
    ids = [line.roleId];
  }
  return [...ids].sort((a, b) => a - b);
}

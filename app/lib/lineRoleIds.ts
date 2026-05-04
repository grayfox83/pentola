import type { LineInterface } from "../interfaces/LineInterface";

/** Список id ролей для реплики: `roleIds` или одиночный `roleId`. */
export function lineRoleIds(line: LineInterface): number[] {
  if (Array.isArray(line.roleIds) && line.roleIds.length > 0) {
    return line.roleIds;
  }
  if (typeof line.roleId === "number") {
    return [line.roleId];
  }
  return [];
}

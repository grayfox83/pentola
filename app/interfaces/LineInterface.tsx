export interface LineInterface {
  action?: string;
  /** Одна роль (как раньше во всех JSON). */
  roleId?: number;
  /** Несколько ролей говорят одну реплику; приоритет над `roleId`, если задан непустой массив. */
  roleIds?: number[];
  line: Array<{
    s: string;
    action?: boolean;
  }>;
}

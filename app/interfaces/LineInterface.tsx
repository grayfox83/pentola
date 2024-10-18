export interface LineInterface {
    action: string;
    roleId: number,
    lines: Array<{
        s: string,
        action: boolean
    }>
}
export interface LineInterface {
    action: string;
    roleId: number,
    line: Array<{
        s: string,
        action: boolean
    }>
}
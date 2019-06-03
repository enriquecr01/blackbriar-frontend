export interface Message
{
    id: number,
    content: string,
    category: string,
    archived: boolean,
    actionRef: any,
    created: string
}
import { User } from './user';

export interface Group
{
    id: number,
    title: string,
    descrption: string,
    image: string,
    owner: User,
    publicGroup: boolean,
    active: boolean
}
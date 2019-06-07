import { User } from './user';

export interface Group
{
    id: number,
    title: string,
    description: string,
    image: string,
    owner: User,
    publicGroup: boolean,
    active: boolean
}
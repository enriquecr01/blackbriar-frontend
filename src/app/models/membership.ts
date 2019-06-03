import { Group } from './group';
import { User } from './user';

export interface Membership
{
    id: number,
    group: Group,
    active: boolean,
    invitation: boolean,
    statusMessage: string,
    student: User
}
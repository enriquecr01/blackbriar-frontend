import { User } from './user';
import { Membership } from './membership';

export interface Group {
    id: number,
    title: string,
    descrption: string,
    image: string,
    owner: User,
    publicGroup: boolean,
    active: boolean,
    membership: Membership
}
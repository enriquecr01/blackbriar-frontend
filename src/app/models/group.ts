import { User } from './user';
import { Membership } from './membership';

export interface Group {
    id: number,
    title: string,
    description: string,
    image: string,
    owner: User,
    publicGroup: boolean,
    active: boolean,
    membership: Membership,
    memberCount: number;
}
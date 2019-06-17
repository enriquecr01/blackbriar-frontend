import { Membership } from './membership';

export interface User
{
  student: any;
    firstName: string;
    lastName: string;
    email: string;
    userId: string;
    photo: string;
    membership: Membership;
}
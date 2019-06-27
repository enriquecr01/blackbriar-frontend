import { User } from './user';

export interface Feedback {
    id: number;
    content: string;
    parentId: number;
    approved: boolean;
    studentDetails: User;
    instructorDetaill: User;
    created: Date;
    update: Date;
    createdSince: string;
}
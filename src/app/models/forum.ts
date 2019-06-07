
import { Timestamp } from 'rxjs';


export interface Setting {
    startDate?: any;
    endDate: string;
    warriorPoints: number;
    healerPoints: number;
    warlockPoints: number;
    validResponsePoints: number;
}

export interface Group {
    id: number;
    title: string;
    description: string;
    image: string;
    publicGroup: boolean;
}

export interface Forum {
    id: number;
    title: string;
    description: string;
    content: string;
    visible: boolean;
    created: string;
    endDate: string;
    settings: Setting;
    group: Group;
    expired: boolean;
    sDate: string;
    sTime: string;
    eDate: string;
    eTime: string;
    smallDescription: string;
    warriorPoints: number;
    healerPoints: number;
    warlockPoints: number;
    validResponsePoints: number;
    published: boolean;
}

export interface ForumRequest {
    title: string;
    description: string;
    content: string;
    published: boolean;
    endDate: string;
    warriorPoints: number;
    healerPoints: number;
    warlockPoints: number;
    validResponsePoints: number;
}



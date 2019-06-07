
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
    settings: Setting;
    group: Group;
    expired: boolean;
    sDate: string;
    sTime: string;
    eDate: string;
    eTime: string;
    smallDescription: string;
    published: boolean;
    warriorPoints: number;
    healerPoints: number;
    warlockPoints: number;
    validResponsePoints: number;
}


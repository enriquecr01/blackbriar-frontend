
import { Timestamp } from 'rxjs';


export interface Setting {
    startDate: string;
    endDate: string;
    fighterPoints: number;
    healerPoints: number;
    bloodmagePoints: number;
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
    warriorPoints: number;
    healerPoints: number;
    warlockPoints: number;
    validResponsePoints: number;
    published: boolean;
}


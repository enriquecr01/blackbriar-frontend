<<<<<<< HEAD

export interface Forum
{
    id: number,
    //atributos que me regresa el api
=======
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
>>>>>>> dev
}
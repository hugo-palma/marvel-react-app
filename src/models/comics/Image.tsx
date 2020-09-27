import IImage from "../IImages";


export interface Image extends IImage{
    path: string;
    extension: string;
}

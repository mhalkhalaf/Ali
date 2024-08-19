import { IDirectorate } from "./Idirectorate";

export interface Locations {
    id: string;
    name : string;
    directorateId: string ;
    directorate: IDirectorate;
}
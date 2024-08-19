import { Data } from "@angular/router";

export interface ProjectDetailForCreation {
    ownerNumber? : number;
    contractorNumber? : number;
    projectName? : string
    isAcceptable?: boolean ;
    description?: string ;
    value?: number ;
    startDate?: string ;
    endDate?: string ;
    comments?: string ;
}
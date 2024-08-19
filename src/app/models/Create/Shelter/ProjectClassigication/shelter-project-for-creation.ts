import { ProjectDetailForCreation } from "../project-detaIl-for-creation";


export interface ShelterProjectForCreation extends ProjectDetailForCreation {
    quantity: number| undefined;
}
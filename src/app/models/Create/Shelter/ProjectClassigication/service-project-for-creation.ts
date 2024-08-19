import { ProjectDetailForCreation } from "../project-detaIl-for-creation";

export interface ServiceProjectForCreation extends ProjectDetailForCreation {
    quantity: number| undefined;
}
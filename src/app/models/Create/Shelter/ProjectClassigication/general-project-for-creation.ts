import { ProjectDetailForCreation } from "../project-detaIl-for-creation";

export interface GeneralProjectForCreation extends ProjectDetailForCreation {
    quantity: number | undefined;
}
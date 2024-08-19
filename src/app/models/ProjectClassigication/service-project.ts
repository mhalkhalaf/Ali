import { ProjectDetail } from "../project-detail";

export interface ServiceProject extends ProjectDetail {
    quantity: number| undefined;
}
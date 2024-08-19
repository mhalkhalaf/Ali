import { ProjectDetail } from "../project-detail";

export interface ShelterProject extends ProjectDetail {
    quantity: number| undefined;
}
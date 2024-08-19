import { ProjectDetail } from "../project-detail";

export interface GeneralProject extends ProjectDetail {
    quantity: number | undefined;
}
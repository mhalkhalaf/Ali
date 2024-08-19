import { ProjectType } from "../../../project-type";
import { GeneralForCreation } from "../general-for-creation";


export interface TypePForCreation extends GeneralForCreation {
    projectType?: ProjectType[];
}
import { Coordibator } from "../../../General/Owner/coordibator";
import { ProjectOwner } from "../../../project-owner";
import { GeneralForCreation } from "../general-for-creation";

export interface OwnerForCreation extends GeneralForCreation {
    projectOwners? : ProjectOwner []
    coordibators?: Coordibator[] ;
}
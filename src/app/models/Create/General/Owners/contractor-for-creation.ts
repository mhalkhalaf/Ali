import { ProjectContractor } from "../../../project-contractor";
import { GeneralForCreation } from "../general-for-creation";

export interface ContractorForCreation extends GeneralForCreation {
    projectContractor? : ProjectContractor []
    phoneNumber?: string ;
}
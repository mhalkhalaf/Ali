import { ProjectDetailForCreation } from "./Create/Shelter/project-detaIl-for-creation";
import { Owner } from "./General/Owner/owner";
import { TypeP } from "./General/Type/typeP";
import { ProjectCamp } from "./project-camp";
import { ProjectContractor } from "./project-contractor";
import { ProjectEngineer } from "./project-engineer";
import { ProjectOwner } from "./project-owner";
import { ProjectType } from "./project-type";

export interface ProjectDetail extends ProjectDetailForCreation {
    id: string ;
    isDeleted?: boolean
    projectCamps? : ProjectCamp []
    // projectOwners? : ProjectOwner []
    projectEngineers? : ProjectEngineer []
    ownerId? : string
    typeId? : string
    owner? : Owner
    typeP? : TypeP
    projectContractors? : ProjectContractor [];
}
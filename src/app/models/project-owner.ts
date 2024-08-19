import { Owner } from "./General/Owner/owner";
import { ProjectDetail } from "./project-detail";

export class ProjectOwner
{
    projectId! : string ;
    projectDetial!: ProjectDetail;
    ownerId!:string;
    owner!: Owner;
}

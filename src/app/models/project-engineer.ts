import { ProjectDetail } from "./project-detail";
import { Engineer } from "./General/Owner/engineer";

export class ProjectEngineer
{
     id! : string
     engineerId! :string
     engineer! : Engineer 
     projectId! :string
     projectDetial!: ProjectDetail 
     salary! : number 
     isUpdated! : boolean 
     updateDate! : string 
}

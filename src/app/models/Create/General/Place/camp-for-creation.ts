import { Locations } from "../../../General/Place/location";
import { ProjectCamp } from "../../../project-camp";
import { GeneralForCreation } from "../general-for-creation";


export interface CampForCreation extends GeneralForCreation {
    locationId: string;
    location?: Locations;
    projectCamp?: ProjectCamp[];
    latityde : number
    longityde : number
    numberFamilies? : number
}
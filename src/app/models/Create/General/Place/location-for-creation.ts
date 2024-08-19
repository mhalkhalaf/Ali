import { Camp } from "../../../General/Place/camp";
import { IDirectorate } from "../../../General/Place/Idirectorate";
import { GeneralForCreation } from "../general-for-creation";


export interface LocationForCreation extends GeneralForCreation {
    camps?: Camp[];
    directorateId?: string ;
    directorate?: IDirectorate ;
}
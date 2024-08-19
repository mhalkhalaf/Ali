import { Owner } from "../../../General/Owner/owner";
import { GeneralForCreation } from "../general-for-creation";

export interface CoordibatorForCreation extends GeneralForCreation {
    ownerId?: string ;
    owner?: Owner ;
    phoneNumber?: string ;
}
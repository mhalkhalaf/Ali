import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import { Owner } from '../models/General/Owner/owner';
import { OwnerForCreation } from '../models/Create/General/Owners/owner-for-creation';
import { Coordibator } from '../models/General/Owner/coordibator';
import { environment } from '../../environments/environment.prod';
@Injectable({
  providedIn: 'root',
})

export class OwnerService {


  constructor(private httpClient : HttpClient) { }

  getOwners() : Observable<Owner[]> {
    return this.httpClient.get<Owner[]>(`${environment.apiUrl}/Owners`)
     }
     getCoordibators() : Observable<Coordibator[]> {
      return this.httpClient.get<Owner[]>(`${environment.apiUrl}/Coordibators`)
     }  
    addOwner(data : OwnerForCreation){
      return this.httpClient.post(`${environment.apiUrl}/Owners`,data)
    }
    updateOwner(data : Owner, id : string){
      return this.httpClient.put(`${environment.apiUrl}/Owners/${id}`,data)
    }
    deleteOwner(id:string){
      return this.httpClient.delete(`${environment.apiUrl}/Owners/${id}`)
    }
}

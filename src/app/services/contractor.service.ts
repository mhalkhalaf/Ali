import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import { Contractor } from '../models/General/Owner/contractor';
import { Owner } from '../models/General/Owner/owner';
import { ContractorForCreation } from '../models/Create/General/Owners/contractor-for-creation';
import { environment } from '../../environments/environment.prod';
@Injectable({
  providedIn: 'root',
})

export class ContractorService {



  constructor(private httpClient : HttpClient) { }


  getContractors() : Observable<Contractor[]> {
    return this.httpClient.get<Contractor[]>(`${environment.apiUrl}/Contractors`)
     }
    addContractor(data : ContractorForCreation){
      return this.httpClient.post(`${environment.apiUrl}/Contractors`,data)
    }
    updateContractor(data : Contractor, id : string){
      return this.httpClient.put(`${environment.apiUrl}/Contractors/${id}`,data)
    }
    deleteContractor(id:string){
      return this.httpClient.delete(`${environment.apiUrl}/Contractors/${id}`)
    }
}

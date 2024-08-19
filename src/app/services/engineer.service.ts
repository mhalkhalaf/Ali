import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { Engineer } from '../models/General/Owner/engineer';
import { EngineerForCreation } from '../models/Create/General/Owners/engineer-for-creation';
@Injectable({
  providedIn: 'root',
})

export class EngineerService {



  constructor(private httpClient : HttpClient) { }


  getEngineers() : Observable<Engineer[]> {
    return this.httpClient.get<Engineer[]>(`${environment.apiUrl}/Engineers`)
     }
    addEngineer(data : EngineerForCreation){
      return this.httpClient.post(`${environment.apiUrl}/Engineers`,data)
    }
    updateEngineer(data : Engineer, id : string){
      return this.httpClient.put(`${environment.apiUrl}/Engineers/${id}`,data)
    }
    deleteEngineer(id:string){
      return this.httpClient.delete(`${environment.apiUrl}/Engineers/${id}`)
    }
}

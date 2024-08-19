import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import { Coordibator } from '../models/General/Owner/coordibator';
import { Owner } from '../models/General/Owner/owner';
import { environment } from '../../environments/environment.prod';
import { CoordibatorForCreation } from '../models/Create/General/Owners/coordibator-for-creation';
@Injectable({
  providedIn: 'root',
})

export class CoordibatorService {

  constructor(private httpClient : HttpClient) { }

  getCoordibators() : Observable<Coordibator[]> {
    return this.httpClient.get<Coordibator[]>(`${environment.apiUrl}/Coordibators`)
     }
    addCoordibator(data : CoordibatorForCreation){
      return this.httpClient.post(`${environment.apiUrl}/Coordibators`,data)
    }
    updateCoordibator(data : Coordibator, id : string){
      return this.httpClient.put(`${environment.apiUrl}/Coordibators/${id}`,data)
    }
    deleteCoordibator(id:string){
      return this.httpClient.delete(`${environment.apiUrl}/Coordibators/${id}`)
    }
}

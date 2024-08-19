import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatestWith, map } from 'rxjs';
import { Camp } from '../models/General/Place/camp';
import { CampForCreation } from '../models/Create/General/Place/camp-for-creation';
import { Locations } from '../models/General/Place/location';
import { environment } from '../../environments/environment.prod';
@Injectable({
  providedIn: 'root',
})

export class CampService {
  constructor(private httpClient : HttpClient) { }

  getCamps() : Observable<Camp[]> {
     return this.httpClient.get<Camp[]>(`${environment.apiUrl}/Camps`)
     }
getCamp(id : string) : Observable<Camp> {
      return this.httpClient.get<Camp>(`${environment.apiUrl}/Camps/${id}`)
      }
    addCamp(data : CampForCreation){
      return this.httpClient.post(`${environment.apiUrl}/Camps`,data)
    }
    updateCamp(data : Camp, id : string){
      return this.httpClient.put(`${environment.apiUrl}/Camps/${id}`,data)
    }
    deleteCamp(id:string){
      return this.httpClient.delete(`${environment.apiUrl}/Camps/${id}`)
    }

  Locations$ = this.httpClient.get<Locations[]>("app/json/location.json")
}

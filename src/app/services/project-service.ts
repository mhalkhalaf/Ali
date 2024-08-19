import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatestWith, map } from 'rxjs';
import { ProjectDetail } from '../models/project-detail';
import { ProjectDetailForCreation } from '../models/Create/Shelter/project-detaIl-for-creation';
import { environment } from '../../environments/environment.prod';
import { TypeP } from '../models/General/Type/typeP';
import { ProjectEngineer } from '../models/project-engineer';
@Injectable({
  providedIn: 'root',
})

export class ProjectService {
  constructor(private httpClient : HttpClient) { }


    getProjectDetails() : Observable<ProjectDetail[]> {
     return this.httpClient.get<ProjectDetail[]>(`${environment.apiUrl}/Project`)
     }
     GetYearOrType(year : number,typeName : string) : Observable<ProjectDetail[]> {
      if (year == 0) {
        return this.httpClient.get<ProjectDetail[]>(`${environment.apiUrl}/Project/0?typeName=${typeName}`)
      }else{
        return this.httpClient.get<ProjectDetail[]>(`${environment.apiUrl}/Project/${year}`)
      }
      }
    getEndAnProject(projectId : string) : Observable<any>
    {
      return this.httpClient.get(`${environment.apiUrl}/Engineers/Project/${projectId}`)
    }
    addProjectDetail(projectDto : ProjectDetailForCreation , campId : string ,typeId : string , ownerId : string){
      return this.httpClient.post(`${environment.apiUrl}/Project?campId=${campId}&typeId=${typeId}&ownerId=${ownerId}`,projectDto)
    }
    updateProjectDetail(data : ProjectDetail, id : string , campId : string ,typeId : string , ownerId : string){
      return this.httpClient.put(`${environment.apiUrl}/Project/${id}?campId=${campId}&typeId=${typeId}&ownerId=${ownerId}`,data)
    }
    deleteProjectDetail(id:string){
      return this.httpClient.delete(`${environment.apiUrl}/Project/${id}`)
    }
  updatePatch(id : string ,contractorId : string){
    return this.httpClient.patch(`${environment.apiUrl}/Project/${id}?contractorId=${contractorId}`,contractorId)
  }
Type$ = this.httpClient.get<TypeP[]>('app/json/type.json')
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAcoount } from '../models/Account/account';
import { IAcoountForCreation } from '../models/Account/account-for-creation';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})

export class AccountService {
  constructor(private httpClient : HttpClient) { }


getAccounts() : Observable<IAcoount[]> {
  return this.httpClient.get<IAcoount[]>(`${environment.apiUrl}/Accounts`)
}

addAccount(data : IAcoountForCreation){
  return this.httpClient.post(`${environment.apiUrl}/Accounts`,data)
}
updateAccount(id: string,data : IAcoount){
  return this.httpClient.put(`${environment.apiUrl}/Accounts/${id}`,data)
}
deleteAccount(id : string) {
  return this.httpClient.delete(`${environment.apiUrl}/Accounts/${id}`);
}
}
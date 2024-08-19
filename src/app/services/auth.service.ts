import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IAcoount } from '../models/Account/account';
import { IAcoountForCreation } from '../models/Account/account-for-creation';
import { environment } from '../../environments/environment.prod';
import { LoginInfo } from '../components/login/login-info';
import { jwtDecode } from 'jwt-decode';
import { AuthResponse } from '../models/Account/auth';
import { Route, Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})

export class AuthService {
  constructor(private httpClient : HttpClient,private router : Router) { }
  private tokenKey = 'token';
    
login(data: LoginInfo): Observable<AuthResponse> {
    return this.httpClient
      .post<AuthResponse>(`${environment.apiUrl}/Authentication/authRequest`, data)
      .pipe(
        map((response) => {
            if (response.isSuccess) {
            localStorage.setItem(this.tokenKey, response.token);
            }
            return response;
        })
      );
  }

  isLoggedIn = (): boolean => {
    const token = this.getToken();
    if (!token) return false;
    return !this.isTokenExpired();
  };

  private isTokenExpired() {
    const token = this.getToken();
    if (!token) return true;
    const decoded = jwtDecode(token);
    const isTokenExpired = Date.now() >= decoded['exp']! * 1000;
    if (isTokenExpired) this.logout();
    return isTokenExpired;
  }

  isRole(role : string) {
    const token = this.getToken();
    let jwtData = token?.split('.')[1];
    let decoded = window.atob(jwtData!)
   if(decoded.includes(role)){
      return true
   }else{
  return false
   }
  }
  logout = (): void => {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(["/login"])
  };

  private getToken = (): string | null =>
    localStorage.getItem(this.tokenKey) || '';
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  auth(): Observable<any[]> {
    return this.http.get<any[]>(`${Config.url}/auth`, Config.options)
  }
  logout() {
    return this.http.get(`${Config.url}/auth/logout`, Config.options)
  }
  login(data: any) {
    return this.http.post(`${Config.url}/auth/login`, data, Config.options)
  }
}
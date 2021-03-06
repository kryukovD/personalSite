import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../config';


@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  constructor(private http: HttpClient) { }
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${Config.url}/projects/all`, Config.options)
  }
  addProject(data:Project):Observable<any>{
    return this.http.post(`${Config.url}/admin/projects/add`,data,Config.options)
  }
  updateProject(data:Project){
    return this.http.put(`${Config.url}/admin/projects/edit`,data,Config.options)
  }
  getFullProjectById(id:string|null):Observable<Project>{
    return this.http.get<Project>(`${Config.url}/admin/projects/select/${id}`,Config.options)
  }
  deleteProject(id:number):any{
    return this.http.delete<Project>(`${Config.url}/admin/projects/delete/${id}`,Config.options)
  }
}
export interface Project {
  id: number,
  title: string,
  image: Blob,
  src: string
}
export interface Notice{
  message:string
  class:string
}

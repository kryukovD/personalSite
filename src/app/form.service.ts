import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Config } from "../config"
import { Observable } from 'rxjs';
const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': "*"
  }),
  withCredentials: true
}
@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor(private http: HttpClient) { }
  sendForm(data: object) {
    return this.http.post(`${Config.url}/orders`, JSON.stringify(data), httpOption)
  }
  getOrders():Observable<Order[]|Notice> {
    return this.http.get<Order[]|Notice>(`${Config.url}/orders/all`)
  }
  insertKeyOrder(id:number,active:number,key?:string):Observable<Notice>{
    return this.http.put<Notice>(`${Config.url}/orders/key`,{id,key,active},httpOption)
  }
  getOrderByKey(id:number,key:string){
    return this.http.post(`${Config.url}/orders/key`,{id,key},httpOption)
  }
  getActiveOrders(id:number):any{
    return this.http.get(`${Config.url}/orders/active/${id}`,httpOption)
  }
}
export interface Notice{
  message:string
  class:string
}
export interface Order{
  id:number,
  name:string,
  family:string,
  phone:string,
  message:string,
  category:string
  
}

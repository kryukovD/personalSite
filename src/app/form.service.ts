import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
const httpOption={headers:new HttpHeaders({
  'Content-Type':'application/json',
  'Access-Control-Allow-Origin':"*"
}),
withCredentials: true
}
@Injectable({
  providedIn: 'root'
})
export class FormService {
  url:string="http://localhost:3000/orders"  
  constructor(private http:HttpClient) { }
  sendForm(data:object){ 
       return this.http.post(this.url,JSON.stringify(data),httpOption)
  }
}

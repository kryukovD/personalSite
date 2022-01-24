import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class RegService {
  constructor(private http: HttpClient) { }
  sendFormReg(data: object): any {
    return this.http.post(`${Config.url}/registration`, data, Config.options)
  }
}

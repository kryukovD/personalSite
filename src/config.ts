import { HttpHeaders } from "@angular/common/http";

export const Config={
    url:"http://localhost:3000",
    options:{heasers:new HttpHeaders({
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':"*"
      }),
   withCredentials: true
    }
}
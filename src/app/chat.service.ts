import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket:Socket) { 

  }
  sendMessage(messages:any){
    this.socket.emit("message",messages)
  }
  getMessage():any{
    return   this.socket.fromEvent('message');
  }
}

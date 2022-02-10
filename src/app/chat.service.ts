import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  messages:UserMessage[]=[]
  rooms:any
  constructor(private socket:Socket,public authService:AuthService) { 

  }
  sendMessage(messages:any,order:Number|undefined){
    this.socket.emit("message",{messages:messages,order:order })
  }
  getMessage():any{
    return   this.socket.fromEvent('message');
  }
  createRoom(room:number|undefined,isAdmin:boolean){
    this.socket.emit("createRoom",room,isAdmin)
  }
  getRooms(){
    return this.socket.fromEvent("getRooms")
  }
  changeRoom(){
    return  this.socket.fromEvent("changeRoom")
  }
  initUser(){
    return this.socket.emit("initUser",{id:this.authService.id,login:this.authService.userLogin,isAdmin:this.authService.isAdmin})
  }
}
export interface UserMessage{
  message:{
  id:number|undefined
  userLogin:string|undefined,
  message:string
  date:number,
  isAdmin?:Boolean
  }
  order:number|undefined
}
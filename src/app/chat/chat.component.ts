import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ChatService,UserMessage } from '../chat.service';
import { FormService } from '../form.service';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  selectOrder?:number
  inputMessage=new FormControl(null,[Validators.required])
  orders?:any
  ordersByAdmin?:any
  constructor(public auth:AuthService,public chatService:ChatService,public formService:FormService ) { }

  ngOnInit(): void {
     this.chatService.initUser()

     this.chatService.getRooms().subscribe((data:any)=>{
        this.chatService.rooms=data.slice(1,data.length)
        console.log(this.chatService.rooms)
     })
     this.chatService.getMessage().subscribe((data:UserMessage[])=>{
       this.chatService.messages=data
      
     })
     this.formService.getActiveOrders(this.auth.id).subscribe((orders:any)=>{
      this.orders=orders
     })
     this.chatService.changeRoom().subscribe((data:any)=>{
         this.chatService.messages=[]
     })
     this.formService.getOrders().subscribe((data)=>{
       this.ordersByAdmin=data
     })
  }

  sendMessage() :boolean|void{
    if(this.inputMessage.errors==null){
    this.chatService.messages.push({message:{id:this.auth.id,userLogin:this.auth.userLogin,message:this.inputMessage.value,date:Date.now(),isAdmin:this.auth.isAdmin},order:this.selectOrder})
    console.log(this.selectOrder)
    this.chatService.sendMessage(this.chatService.messages,this.selectOrder)
    this.chatService.getMessage().subscribe((data:any)=>{
      this.chatService.messages=data
     })
    this.inputMessage.setValue("")
    }
    else{
       return false
    }
  }
  changeSelectOrder(event:any,value:any){
    this.selectOrder=value
    this.chatService.createRoom(value,this.auth.isAdmin)
  
  }
 
}

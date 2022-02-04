import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ChatService } from '../chat.service';
import { FormOrderComponent } from '../form-order/form-order.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messages:any=[]
  inputMessage=new FormControl(null,[Validators.required])
  constructor(public auth:AuthService,public chatService:ChatService ) { }

  ngOnInit(): void {
  
     this.chatService.getMessage().subscribe((data:any)=>{
      this.messages=data
     })
    

  }

  sendMessage(){
    this.messages.push(this.inputMessage.value)
    this.chatService.sendMessage(this.messages)
    this.chatService.getMessage().subscribe((data:any)=>{
      this.messages=data
     })
    this.inputMessage.setValue("")
  }
 
}

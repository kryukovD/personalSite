import { Component, OnInit } from '@angular/core';
import { FormControl, RequiredValidator, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FormService } from '../form.service';
import { MatSelectChange } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-form-order',
  templateUrl: './form-order.component.html',
  styleUrls: ['./form-order.component.scss']
})
export class FormOrderComponent implements OnInit {

  name=new FormControl(null,[
    Validators.required,
    Validators.maxLength(20),
    Validators.pattern('([a-zA-Z ]+)|([а-яА-Я]+)')
  ])
  family=new FormControl(null,[
    Validators.required,
    Validators.maxLength(30),
    Validators.pattern('([a-zA-Z ]+)|([а-яА-Я]+)')
  
  ])
  phone=new FormControl(null,[
    Validators.required,
    Validators.maxLength(11),
    Validators.pattern('^[1-9]+[0-9]*$')
  ])
  category:string=""
  message=new FormControl(null,[
    Validators.required
  ])
  email=new FormControl(null,[
    Validators.required,
    Validators.email
  ])
  
  
  public systemMessage?:any
  constructor(private http:HttpClient,private formService:FormService, private dialog:MatDialog) { }

  ngOnInit(): void {
    
  }
  sendForm():void{
   if (!(this.name.errors && this.family.errors && this.message.errors && this.phone.errors)){
    this.formService.sendForm({name:this.name.value,family:this.family.value,phone:this.phone.value,category:this.category,message:this.message.value,email:this.email.value}).subscribe(
      (data:any)=>{
        this.systemMessage=data
        setTimeout(()=>this.dialog.closeAll(),1500)
      },
      error=>{
        if(error.statusText=="Unknown Error")
        this.systemMessage={message:"Связь с сервером прервалась",messageClass:"error"}
        else
        this.systemMessage={message:error.error.message,messageClass:error.error.messageClass}
       }

    )
   }

  }
  selectionChange(event:MatSelectChange){
    this.category=event.value
  }

}

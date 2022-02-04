import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { Message } from '../header/header.component';
import { RegService } from '../registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  regForm:FormGroup=new FormGroup({
    login:new FormControl(null,[Validators.required]),
    password:new FormControl(null,[Validators.required,Validators.minLength(8)]),
    confirm:new  FormControl(null,[Validators.required])
  })
  messages?:Message
  color: ThemePalette = "primary"
  dropMenu:Boolean=false
  @ViewChild("btn",{static:true}) radioBtn:any
  constructor(public regService:RegService,public auth:AuthService,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.regForm.controls.confirm.addValidators(checkPassword(this.regForm))
  }
  sendFormReg(event:Event){
    event.stopPropagation()
    if(this.regForm.errors===null && this.radioBtn._checked!=false){
    this.messages=undefined
    this.regService.sendFormReg({login:this.regForm.controls.login.value,password:this.regForm.controls.password.value}).subscribe((data:any)=>{
      this.messages=data
      this.auth.auth().subscribe((data:any)=>{
       this.auth.userLogin=data.login
       this.dialog.closeAll()
       
      },(error)=>{
        throw error
      })
    })
    ,(error:any)=>{
      this.messages={message:"Связь с сервером недоступна",type:"error"}
    }
     
    }
    else{  
      this.messages=({message:"*Заполните форму правильно",type:"error"})
    }
   
    
  } 
  closeReg(){
    
  }
  handleClick(event:Event){
    event.stopPropagation()
  }
}
export function checkPassword(form:FormGroup):ValidatorFn{
  return (control:AbstractControl):ValidationErrors|null=>{
    if(form.controls.password.value!==form.controls.confirm.value){
      return {checkPassword:"Пароли не совпадают"}
    }
    else{
      return null
    }
  }
}

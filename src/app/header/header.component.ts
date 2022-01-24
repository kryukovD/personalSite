import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RegService } from '../registration.service';
import { ThemePalette } from '@angular/material/core'
import { AuthService } from '../auth.service';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations:[trigger("openLogin",[
    state("false",style({display:"none"})),
    state("true",style({display:"flex"})),
    transition('initial <=> expanded', animate('0.3s'))
  ])]
})

export class HeaderComponent implements OnInit {
  @ViewChild("btn",{static:true}) radioBtn:any
  color: ThemePalette = "primary";
  login?:string
  openLogin :Boolean=false
  dropMenu:Boolean=false
  profile:Boolean=false
  loginForm:FormGroup=new FormGroup({
    loginIn:new FormControl(null,[Validators.required]),
    passwordIn:new FormControl(null,[Validators.required,Validators.minLength(8)])
  })
  regForm:FormGroup=new FormGroup({
    login:new FormControl(null,[Validators.required]),
    password:new FormControl(null,[Validators.required,Validators.minLength(8)]),
    confirm:new  FormControl(null,[Validators.required])
  })
  messages?:Message
  messagesLogin?:Message
  constructor(public regService:RegService,public auth:AuthService) { 
  
  }

  ngOnInit(): void {
    this.auth.auth().subscribe((data:any)=>{
      this.login=data.login
    
    })
    this.regForm.controls.confirm.addValidators(checkPassword(this.regForm))
    document.addEventListener("click",()=>{
      this.openLogin=false
      this.dropMenu=false
      this.profile=false
    }
    )
  } 
  
  open(event:Event){
    event.stopPropagation()
    this.openLogin=!this.openLogin
  }
  openReg(event:Event){
    this.dropMenu=!this.dropMenu
  }
  closeReg(){
    this.dropMenu=false
  }
  handleClick(event:Event){
    event.stopPropagation()
  }
 
  sendFormReg(event:Event){
    event.stopPropagation()
    console.log(this.radioBtn)
    if(this.regForm.errors===null && this.radioBtn._checked!=false){
    this.messages=undefined
    this.regService.sendFormReg({login:this.regForm.controls.login.value,password:this.regForm.controls.password.value}).subscribe((data:any)=>{
      this.auth.auth().subscribe((data:any)=>{
        this.login=data.login
        this.dropMenu=false
        this.openLogin=false
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
  toggleProfile(){
    this.profile=!this.profile
  }
  logout(){
    this.auth.logout().subscribe((data)=>{
      this.login=undefined
    },
    (error)=>{
      throw error
    }
    )
  }
  loginF(){
    const data={login:this.loginForm.controls.loginIn.value,password:this.loginForm.controls.passwordIn.value}
    this.auth.login(data).subscribe((data:any)=>{
      if(data.message){
      this.messagesLogin={message:"*Неверные данные",type:"error"}
      }
      else{
        this.login=data.login
        this.openLogin=false
        this.profile=false
      }
      
    },
    (error)=>{
      this.messagesLogin={message:"Связь с сервером прервалась",type:"error"}
    })
  }
}
 export interface Message {
    message:string
    type:string
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
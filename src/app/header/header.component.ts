import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RegService } from '../registration.service';
import { ThemePalette } from '@angular/material/core'
import { AuthService } from '../auth.service';
import {MatMenuTrigger} from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog'; 
import { RegistrationComponent } from '../registration/registration.component';
import { Router } from '@angular/router';




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
  @ViewChild(MatMenuTrigger) trigger?: MatMenuTrigger;
  openLogin :Boolean=false
  dropMenu:Boolean=false
  profile:Boolean=false
  loginForm:FormGroup=new FormGroup({
    loginIn:new FormControl(null,[Validators.required]),
    passwordIn:new FormControl(null,[Validators.required,Validators.minLength(8)])
  })
  
  messagesLogin?:Message
  dialogRef?:any
  constructor(public regService:RegService,public auth:AuthService,public dialog :MatDialog,private route:Router) { 
  
  }

  ngOnInit(): void {
     
    this.auth.auth().subscribe((data:any)=>{
      this.auth.userLogin=data.login
      this.auth.isAdmin=data.isAdmin
      this.auth.id=data.id
    
    })
    document.addEventListener("click",()=>{
      this.openLogin=false
      this.dropMenu=false
      this.profile=false
    }
    )
  } 
  ngAfterViewInit(){
    window.matchMedia('(min-width:961px)').addListener((e)=>{
      if(e.matches){
        this.trigger!.closeMenu()
      }
    })
  }
 
  
  open(event:Event){
    event.stopPropagation()
    this.openLogin=!this.openLogin
  }

  
  handleClick(event:Event){
    event.stopPropagation()
  }
 
  toggleProfile(){
    this.profile=!this.profile
  }
  logout(){
    this.auth.logout().subscribe((data)=>{
      this.auth.userLogin=undefined
      this.route.navigate(["/"])
      
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
        this.auth.userLogin=data.login
        this.openLogin=false
        this.profile=false
        this.auth.isAdmin=data.isAdmin
        this.auth.id=data.idusers
        this.messagesLogin=undefined
      }
      
    },
    (error)=>{
      this.messagesLogin={message:"Связь с сервером прервалась",type:"error"}
    })
  }
  openReg(){
    this.dialogRef=this.dialog.open(RegistrationComponent)
  }
}
 export interface Message {
    message:string
    type:string
}



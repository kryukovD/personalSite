import { Component, ElementRef, OnInit } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public route: Router, public el: ElementRef) {

  }
  title = 'Krukov_Studio';
  ngOnInit(): void {
    
    console.log(process.env)
  }

 
  

}


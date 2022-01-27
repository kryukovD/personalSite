import { Component, OnInit } from '@angular/core';
declare function init():void
@Component({
  selector: 'app-banner-portfolio',
  templateUrl: './banner-portfolio.component.html',
  styleUrls: ['./banner-portfolio.component.scss']
})

export class BannerPortfolioComponent implements OnInit {
   width?:number

  constructor() { }

  ngOnInit(): void {
  
 
  }
  ngAfterViewInit(){
    
    init()
  }
  

}

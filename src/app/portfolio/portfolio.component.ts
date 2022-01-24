import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core'; 
import { Router } from '@angular/router';
import * as css from "css-font-loading-module"
import { NgxMasonryComponent } from 'ngx-masonry';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  @ViewChild ("masonry",{static:true})
  masonry!:NgxMasonryComponent
  @ViewChildren("canvas")
  canvasRef!:QueryList<ElementRef>
  portfolio:Array<Portfolio>=[{title:"kareliagroup.com",path:"assets/jungle-site.jpg",src:"https://kareliagroup.com/"},
  {title:"ptz.moizakazy.com",path:"assets/zakazy-site.jpg",src:"https://ptz.moizakazy.ru/"},
  {title:"ptz.moizakazy.com",path:"assets/zakazy-site.jpg",src:"https://ptz.moizakazy.ru/"}
]
  customOptions:OwlOptions={
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 2
      },
      940: {
        items: 2
      }
    },
    nav: true
  
  }
  constructor(public route:Router) { }

  ngOnInit(): void {
    
    
  }
  ngAfterViewInit(){
    let f = new FontFace('Caveat', 'url(../../assets/fonts/Caveat-Regular.ttf)');
    f.load().then(()=>{
      this.canvasRef.forEach((item,index,number)=>{
        switch(index){
          case 0 :
            this.initCanvasElement(item,'Angular')
          break
          case 1 :
            this.initCanvasElement(item,'Html5')
            break
          case 2:
            this.initCanvasElement(item,'Css3')
            break
            case 3:
            this.initCanvasElement(item,'NodeJs')
            break

        
        }

    });
     
    });
    
  
  }

  initCanvasElement(item:ElementRef,text:string):void{
    const ctx=item.nativeElement.getContext("2d")
    ctx!.arc(100,100,80,0,(Math.PI/180)*360)
    ctx!.font="50px Caveat"
    ctx!.textAlign="center"
    ctx!.textBaseline="middle"
    ctx!.fillText(text,90,95)

    ctx!.stroke()
  }


}
interface Portfolio{
  title:string,
  path:string
  src:string
}


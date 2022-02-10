import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
   id?:string|null
  constructor() { }

  ngOnInit(): void {
  }
  addManual($event :Event){
    let el=$event.currentTarget as HTMLElement
    this.id=el.getAttribute("id")
  }
  back(){
    this.id=undefined
  }


}

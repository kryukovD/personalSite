import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Notice, Order } from '../form.service';
import {AuthService} from "../auth.service"
import { FormControl } from '@angular/forms';
import { FormService } from '../form.service';
import { map,mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-cab-orders',
  templateUrl: './cab-orders.component.html',
  styleUrls: ['./cab-orders.component.scss']
})
export class CabOrdersComponent implements OnInit {
  user?:any
  activeOrders?:any
  notice?:Notice
  key=new FormControl()
  displayedColumns=["active","category","family","name"]
  constructor(private auth:AuthService,private form:FormService,private changeDetectorRef:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.auth.auth().subscribe((data:any)=>{
      this.user=data
      this.form.getActiveOrders(this.user.id).subscribe((data:any)=>{
        if(data.length>0){
        this.activeOrders=data
        }
      })
  })
    
}
  activateOrder(){
     this.form.getOrderByKey(this.user.id,this.key.value).pipe(
       mergeMap((data:any)=>{
        this.notice=data
        return this.form.getActiveOrders(this.user.id)
     })).subscribe((data)=>this.activeOrders=data)
  }
  clear(){
    this.key.setValue("")
  }


}
  


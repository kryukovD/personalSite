import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { FormOrderComponent } from '../form-order/form-order.component';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
   image:string="http://localhost:4200/assets/human.png"
   defaultImage:string="http://localhost:4200/assets/thumbnail.png"
  constructor(public dialog: MatDialog) { }
  openDialog() {
    const dialogRef = this.dialog.open(FormOrderComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  ngOnInit(): void {
  }
  

}


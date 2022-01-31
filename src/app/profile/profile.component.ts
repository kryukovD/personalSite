import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  type?:string
  constructor(private route :ActivatedRoute) { }
  

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:any)=>{
      this.type=params.get("type")
    })
  }

}

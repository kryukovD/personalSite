import { Component, OnInit } from '@angular/core';
declare function initContacts():void
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }
  ngAfterViewInit(){
    initContacts()
  }

}

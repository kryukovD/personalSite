import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PortfolioService } from '../portfolio.service';


@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {

  constructor(public portfolioSetvice: PortfolioService, public route: ActivatedRoute, public loc: Location) { }
  article?: any
  notice?: any
  @ViewChild("file", { static: true })
  file!: ElementRef
  srcLoadedImage?: string
  editForm = new FormGroup({
    id: new FormControl(null),
    title: new FormControl(null, [Validators.required]),
    image: new FormControl(null),
    src: new FormControl(null, [Validators.required])
  })
  dataPage?: any
  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.dataPage = data
    })
  }
  showLoadedImage(event: Event) {
    const target = event.target as HTMLInputElement
    const file = target.files as any
    const f = file[0]
    if (!f.type.match('image.*')) {
      alert("Только фотографии");
    }
    const reader = new FileReader();
    // Closure to capture the file information.
    reader.onload = (e: any) => {
      this.srcLoadedImage = e.target.result
    }

    // Read in the image file as a data URL.
    reader.readAsDataURL(f);


  }
  submit() {
    let checkError = false
    for (let key in this.editForm.controls) {
      if (this.editForm.controls[key].errors) {
        checkError = true
        break
      }

    }
    if (checkError == false) {
      if (!this.srcLoadedImage) {
        this.srcLoadedImage = this.article.image
      }
      if (this.dataPage.type == "edit") {
        this.portfolioSetvice.updateProject({ ...this.editForm.value, image: this.srcLoadedImage }).subscribe((result: any) => {
          this.notice = result
          this.article = { ...this.article, image: this.srcLoadedImage }
        })
      }
      else if (this.dataPage.type == "add") {
        this.portfolioSetvice.addProject({ ...this.editForm.value, image: this.srcLoadedImage }).subscribe((result:any)=>{
          this.notice = result
        })
      }
    }
    else {
      this.notice = { class: "error", message: "Ошибка" }
    }

  }

}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PostsService } from '../posts.service';
import { ActivatedRoute } from '@angular/router';
import { HtmlAstPath } from '@angular/compiler';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  article?: any
  notice?: any
  @ViewChild("file", { static: true })
  file!: ElementRef
  srcLoadedImage?: string
  editForm = new FormGroup({
    id: new FormControl(null),
    theme: new FormControl(null, [Validators.required]),
    shortdesc: new FormControl(null, [Validators.required]),
    image: new FormControl(null),
    fulltext: new FormControl(null, [Validators.required])
  })
  dataPage?: any
  constructor(public postSetvice: PostsService, public route: ActivatedRoute, public loc: Location) { }


  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.dataPage = data
    })
    const id = this.route.snapshot.paramMap.get("id")
    if (this.dataPage.type == "edit") {
      this.postSetvice.getFullArticle(id).subscribe((data: any) => {
        this.article = data
        this.editForm.setValue({ id: data.id, theme: data.theme, shortdesc: data.shortdesc, image: "", fulltext: data.fulltext })
      })
    }


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
        this.postSetvice.editPost({ ...this.editForm.value, image: this.srcLoadedImage }).subscribe((result: any) => {
          this.notice = result
          this.article = { ...this.article, image: this.srcLoadedImage }
        })
      }
      else if (this.dataPage.type == "add") {
        this.postSetvice.addPost({ ...this.editForm.value, image: this.srcLoadedImage }).subscribe((result:any)=>{
          this.notice = result
        })
      }
    }
    else {
      this.notice = { class: "error", message: "Ошибка" }
    }

  }
  back() {
    this.loc.back()
  }
  deletePost(){
    this.postSetvice.deletePost(this.editForm.value).subscribe((result)=>{
      this.notice=result
    })
  }



}

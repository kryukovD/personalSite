import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Config } from '../config';
@Injectable({
  providedIn: 'root'
})

export class PostsService {


  constructor(private http:HttpClient) { }
  getPosts():Observable<any[]>{
    return this.http.get<any[]>(`${Config.url}/posts`,Config.options)
  }
  getFullArticle(id:string|null):Observable<any[]>{
    return this.http.get<any[]>(`${Config.url}/posts/${id}`,Config.options)
  }
  editPost(data:Post):Observable<HttpResponse<Post>>{
    return this.http.post<HttpResponse<Post>>(`${Config.url}/admin/post/edit`,data,Config.options)
  }
  addPost(data:Post):Observable<HttpResponse<Post>>{
    return this.http.post<HttpResponse<Post>>(`${Config.url}/admin/post/add`,data,Config.options)
  }
  deletePost(data:Post){
    return this.http.post<HttpResponse<Post>>(`${Config.url}/admin/post/delete`,data,Config.options)
  }
}
interface Post{
  id:number,
  theme:string,
  shortdesc:string,
  fulltext:string,
  image:string
}

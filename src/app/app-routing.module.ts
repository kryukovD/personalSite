import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PortfolioComponent} from "./portfolio/portfolio.component"
import { MainComponent } from './main/main.component';
import {BlogComponent} from "./blog/blog.component";
import {ContactsComponent} from "./contacts/contacts.component"
import { DetailArticleComponent } from './detail-article/detail-article.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './admin.guard';
import { EditPostComponent } from './edit-post/edit-post.component';
import { EditProjectComponent } from './edit-project/edit-project.component';



const routes: Routes = [
  {path:"",component:MainComponent, pathMatch: 'full'},
  {path:"portfolio",component:PortfolioComponent},
  {path:"blog",component:BlogComponent},
  {path:"contacts",component:ContactsComponent},
  {path:"blog/:id",component:DetailArticleComponent},
  {path:"admin",component:AdminComponent ,canActivate:[AdminGuard]},
  {path:"admin/post/edit/:id",component:EditPostComponent ,canActivate:[AdminGuard],data:{type:"edit",title:"Изменить"}},
  {path:"admin/post/add",component:EditPostComponent,canActivate:[AdminGuard],data:{type:"add",title:"Добавить"}},
  {path:"admin/portfolio/edit/:id",component:EditProjectComponent,canActivate:[AdminGuard],data:{type:"edit",title:"Изменить"}},
  {path:"admin/portfolio/add",component:EditProjectComponent,canActivate:[AdminGuard],data:{type:"add",title:"Добавить"}},
  { path: '**', redirectTo: '/' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

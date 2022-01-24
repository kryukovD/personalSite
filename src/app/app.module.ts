import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { BannerComponent } from './banner/banner.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FormOrderComponent } from './form-order/form-order.component';
import { CategorySitesComponent } from './category-sites/category-sites.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import { AdvantageComponent } from './advantage/advantage.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { FooterComponent } from './footer/footer.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { MainComponent } from './main/main.component';
import { BlogComponent } from './blog/blog.component';
import { ContactsComponent } from './contacts/contacts.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import { MatPaginatorIntlCro } from './customPaginator';
import { DetailArticleComponent } from './detail-article/detail-article.component';
import { AdminComponent } from './admin/admin.component';
import {MatButtonModule} from '@angular/material/button';
import { EditPostComponent } from './edit-post/edit-post.component';
import {LazyLoadImageModule} from "ng-lazyload-image"
import {CarouselModule} from "ngx-owl-carousel-o"
import {MatDividerModule} from '@angular/material/divider';
import { EditProjectComponent } from './edit-project/edit-project.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    FormOrderComponent,
    CategorySitesComponent,
    AdvantageComponent,
    FooterComponent,
    PortfolioComponent,
    MainComponent,
    BlogComponent,
    ContactsComponent,
    DetailArticleComponent,
    AdminComponent,
    EditPostComponent,
    EditProjectComponent
    

  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatTabsModule,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule ,
    HttpClientModule,
    MatCheckboxModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatButtonModule,
    LazyLoadImageModule,
    CarouselModule,
    MatDividerModule
    
    
    
    
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro}],
  bootstrap: [AppComponent]
})
export class AppModule { }

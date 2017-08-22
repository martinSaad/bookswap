import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router'

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {LoginComponent} from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';

import { ValidateService } from './services/validate.service'
import { AuthService } from './services/auth.service'
import {AuthGuard} from "./guards/auth.guard";
import {GoogleBooksService} from "./services/google-books.service";
import { NotfoundComponent } from './components/notfound/notfound.component';
import { BookComponent } from './components/book/book.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarNosearchComponent } from './components/navbar-nosearch/navbar-nosearch.component';
import {InfiniteScrollModule} from "angular2-infinite-scroll";
import {MdDialogModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AboutComponent } from './components/about/about.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';


const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'book',
    component: BookComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'how-it-works',
    component: HowItWorksComponent
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    NotfoundComponent,
    BookComponent,
    FooterComponent,
    NavbarNosearchComponent,
    AboutComponent,
    HowItWorksComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    InfiniteScrollModule,
    MdDialogModule,
    BrowserAnimationsModule
  ],
  providers: [
    ValidateService,
    AuthService,
    AuthGuard,
    GoogleBooksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

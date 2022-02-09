import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/layout/nav-bar/nav-bar.component';
import { HeadingComponent } from './components/content/heading/heading.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {NgxNavbarModule} from "ngx-bootstrap-navbar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ExperienceComponent } from './components/content/experience/experience.component';
import { TitleComponent } from './components/layout/title/title.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { DegreesComponent } from './components/content/degrees/degrees.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HeadingComponent,
    ExperienceComponent,
    TitleComponent,
    DegreesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxNavbarModule,
    AccordionModule.forRoot(),
  ],
  providers: [ HttpClient ],
  bootstrap: [AppComponent]
})
export class AppModule { }

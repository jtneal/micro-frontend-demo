import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Example1Component } from './example1/example1.component';
import { Example2Component } from './example2/example2.component';
import { Example3Component } from './example3/example3.component';
import { Mfe1Module } from './mfe1/mfe1.module';

@NgModule({
  declarations: [
    AppComponent,
    Example1Component,
    Example2Component,
    Example3Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Mfe1Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

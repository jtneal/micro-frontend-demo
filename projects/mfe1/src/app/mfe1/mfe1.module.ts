import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Example1Component } from './example1/example1.component';
import { Example2Component } from './example2/example2.component';
import { Example3Component } from './example3/example3.component';
import { Mfe1RoutingModule } from './mfe1-routing.module';
import { Mfe1Component } from './mfe1.component';


@NgModule({
  declarations: [
    Example1Component,
    Example2Component,
    Example3Component,
    Mfe1Component
  ],
  imports: [
    CommonModule,
    Mfe1RoutingModule
  ]
})
export class Mfe1Module { }

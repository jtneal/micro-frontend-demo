import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Example1Component } from './example1/example1.component';
import { Example2Component } from './example2/example2.component';
import { Example3Component } from './example3/example3.component';
import { NullComponent } from 'ng-micro-frontend';

const mfeRoutes: Routes = [];

const routes: Routes = [
  { component: Example1Component, path: 'example1' },
  { component: Example2Component, path: 'example2' },
  { component: Example3Component, path: 'example3' },
  { children: mfeRoutes, path: 'mfe1' },
  { component: NullComponent, path: '**' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

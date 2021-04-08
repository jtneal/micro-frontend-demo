import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Mfe3Component } from './mfe3.component';

const mfeRoutes: Routes = [];

const routes: Routes = [{ children: mfeRoutes, component: Mfe3Component, path: '' }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Mfe3RoutingModule { }

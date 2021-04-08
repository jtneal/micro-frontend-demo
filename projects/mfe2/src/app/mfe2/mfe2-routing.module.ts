import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Mfe2Component } from './mfe2.component';

const mfeRoutes: Routes = [];

const routes: Routes = [{ children: mfeRoutes, component: Mfe2Component, path: '' }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Mfe2RoutingModule { }

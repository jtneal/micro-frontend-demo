import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { createMicroFrontendDynamicRoute } from 'ng-module-federation';
import { microFrontends } from '../micro-frontends';

const routes: Routes = [...microFrontends.map((m) => createMicroFrontendDynamicRoute(m))];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

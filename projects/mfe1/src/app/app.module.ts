import { ApplicationRef, DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Example1Component } from './example1/example1.component';
import { Example2Component } from './example2/example2.component';
import { Example3Component } from './example3/example3.component';

@NgModule({
  declarations: [
    AppComponent,
    Example1Component,
    Example2Component,
    Example3Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
})
export class AppModule implements DoBootstrap {
  public constructor(private readonly injector: Injector) { }

  public ngDoBootstrap(appRef: ApplicationRef): void {
    if (environment.production) {
      const customElement = createCustomElement(AppComponent, { injector: this.injector });
      customElements.define('custom-mfe1', customElement);
    } else {
      appRef.bootstrap(AppComponent);
    }
  }
}

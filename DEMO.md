# Code Demo

If you want to follow along, here is the software I already have installed:

| Software    | Version |
| ----------- | ------- |
| Node        | 14.16.0 |
| NPM         | 7.6.0   |
| Yarn        | 1.22.10 |
| Angular CLI | 11.2.6  |

## Generate Shell and Micro Frontends

I start off by generating an Angular workspace and a default project for the shell.
I then add my subprojects for the micro frontends.

```sh
ng new --routing --strict --style scss shell
ng generate application --routing --style scss mfe1
ng generate application --routing --style scss mfe2
ng generate application --routing --style scss mfe3
```

## Generate Example Components

Next, I generate some example components to show how we can include multiple pages within a micro frontend.

```sh
ng g component --project mfe1 example1
ng g component --project mfe1 example2
ng g component --project mfe1 example3
```

## Update projects/mfe1/src/app/app-routing.module.ts

Create routes pointing to the example components we just created:

```ts
import { Example1Component } from './example1/example1.component';
import { Example2Component } from './example2/example2.component';
import { Example3Component } from './example3/example3.component';

const routes: Routes = [
  { component: Example1Component, path: 'example1' },
  { component: Example2Component, path: 'example2' },
  { component: Example3Component, path: 'example3' },
];
```

## Update projects/mfe1/src/app/app.component.html

Remove all the Angular boilerplate and add links to our new routes:

```html
<p>{{ title }} works!</p>

<nav>
  <ul>
    <li><a routerLink="example1">Example 1</a></li>
    <li><a routerLink="example2">Example 2</a></li>
    <li><a routerLink="example3">Example 3</a></li>
  </ul>
</nav>

<router-outlet></router-outlet>
```

## Update projects/mfe*/src/app/app.component.html

```html
<p>{{ title }} works!</p>
<router-outlet></router-outlet>
```

## Update src/app/app.component.html

Remove this code and everything in between:

```html
  <!-- Resources -->
  ...
  </footer>
```

## Commit Changes

This is a good point to commit these changes so that we can easily jump back to this:

```sh
git add --all
git commit -m 'Update routes and component html'
```

## Install Angular Elements

If you aren't familiar with Angular Elements, it enables you to package Angular components as custom elements.
This lets you create framework-agnostic web components that are easily referenced using custom HTML elements.

```sh
ng add @angular/elements
```

## Install NGX Build Plus

If you aren't familiar with NGX Build Plus, it enables us to customize our build process to produce a single JavaScript bundle.
It also supports providing partial Webpack configurations.
All of this makes working with custom elements much easier.

```sh
ng add ngx-build-plus --project mfe1
ng add ngx-build-plus --project mfe2
ng add ngx-build-plus --project mfe3
```

This is probably a good time to note that while I'm doing this demo within a single monorepo, that is certainly not a requirement.
You could just as easily adapt all of these steps to work with separate repos for each of the applications.
I'm just doing it this way because it's a lot easier to present for demo purposes, rather than jumping between 4 independent codebases.

## Install NPM Run All

NPM Run All enables us to run NPM scripts in parallel to speed up our build process.

```sh
yarn add npm-run-all --dev
```

## Add Build Scripts to package.json

These build scripts will make working with custom elements much easier.
We have a script to create our bundles without output hashing and using a single bundle with NGX Build Plus.
We also have some scripts that enable us to build the elements in parallel with NPM Run All.

```json
    "build:element": "npm run build -- --prod --output-hashing none --single-bundle true",
    "build:element:mfe1": "npm run build:element -- --project mfe1",
    "build:element:mfe2": "npm run build:element -- --project mfe2",
    "build:element:mfe3": "npm run build:element -- --project mfe3",
    "build:elements": "run-p build:element:**",
```

## Update src/app/app.module.ts

We have to tell Angular that our shell will be using custom elements so that we don't get errors about using non-existent elements.

```ts
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
```

## Update all 3 projects/mfe*/src/app/app.module.ts files

We adjust our bootstrap configuration to be dynamic.
When you do a production build, everything will be built as a custom element.
When you do a normal build or ng serve, it will continue to bootstrap the App Component like normal.

```ts
import { ApplicationRef, DoBootstrap, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

export class AppModule implements DoBootstrap {
  public constructor(private readonly injector: Injector) { }

  public ngDoBootstrap(appRef: ApplicationRef): void {
    if (environment.production) {
      const customElement = createCustomElement(AppComponent, { injector: this.injector });
      customElements.define('custom-mfe*', customElement);
    } else {
      appRef.bootstrap(AppComponent);
    }
  }
}
```

Be sure to replace the * with the number 1-3. Also remove the bootstrap array:

```ts
  bootstrap: [AppComponent]
```

## Run mfe1

```sh
ng serve --project mfe1
```

Visit http://localhost:4200 to see mfe1 in standalone mode.

## Build and Copy Custom Elements

```sh
yarn run build:elements && cp -R dist/mfe* src/assets
```

## Run the Shell

```sh
yarn start
```

## Update src/index.html

We'll only include a single polyfills file because, at this point, they are all identical.

```html
  <script src="/assets/mfe1/polyfills.js"></script>
  <script src="/assets/mfe1/main.js"></script>
  <script src="/assets/mfe2/main.js"></script>
  <script src="/assets/mfe3/main.js"></script>
```

## Update src/app/app.component.html

We need to reference the custom elements so they can be interpreted and displayed.

```html
<custom-mfe1></custom-mfe1>
<custom-mfe2></custom-mfe2>
<custom-mfe3></custom-mfe3>
```

## Voilà!

Visit http://localhost:4200 to see the micro frontend architecture in action.

Alright! This thing is pretty solid...let's push it to production! Wait, not so fast...
There are some issues with this approach.
For one, it ends up requiring quite a bit of code, especially to separate your custom elements with routes which we haven't even done here.
For two, browser state history is current broken. If you hit the browser back button, everything breaks.
Also, if you try to reload while on a custom element route, it doesn't work.
Let's try a slightly different approach that makes all of this so much easier.

## Clean Workspace

First, we need to rollback to the commit we made earlier so we can start fresh:

```sh
git clean -fd
git reset --hard
yarn
```

## Next Demo

[Click here for the next demo.](https://github.com/jtneal/micro-frontend-demo/blob/custom-elements/DEMO.md#install-ng-micro-frontend)

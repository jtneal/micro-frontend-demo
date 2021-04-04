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

## Install ng-micro-frontend

This time, instead, we're just going to install a package called ng-micro-frontend:

```sh
ng add ng-micro-frontend --project mfe1 --type micro --port 4210
ng add ng-micro-frontend --project mfe2 --type micro --port 4220
ng add ng-micro-frontend --project mfe3 --type micro --port 4230
ng add ng-micro-frontend --project shell --type shell --port 4200
```

This package helps abstract away a lot of the complexity and really simplifies this approach.
This allows you to focus on your application and your requirements.
We'll have to install this package for every micro frontend and shell application.
Also, you'll notice these commands do a whole lot more than just adding the package.
Using Angular Schematics, a lot of setup and scaffolding happens for you automatically.
It's the same technology the Angular CLI uses for things like `ng new` and `ng generate`.
Angular Schematics is another topic I'm super passionate about and considering doing a talk on.
It's very powerful, and more people should be taking advantage of it.

## Update projects/mfe1/src/app/app-routing.module.ts

We need to move our example routes to the mfeRoutes array instead:

```ts
const mfeRoutes: Routes = [
  { component: Example1Component, path: 'example1' },
  { component: Example2Component, path: 'example2' },
  { component: Example3Component, path: 'example3' },
];
```

## Update projects/mfe1/src/app/app.component.html

We need to update our mfe1 navigation to point to the namespaced route:

```html
<p>{{ title }} works!</p>

<nav>
  <ul>
    <li><a routerLink="/mfe1/example1">Example 1</a></li>
    <li><a routerLink="/mfe1/example2">Example 2</a></li>
    <li><a routerLink="/mfe1/example3">Example 3</a></li>
  </ul>
</nav>

<router-outlet></router-outlet>
```

## Run mfe1

```sh
yarn run start:mfe1
```

Visit http://localhost:4210 to see mfe1 in standalone mode.

## Run Everything

```sh
yarn start
```

This is going to build all 4 applications, so it will take awhile.
This is using `ng serve` so that if you make changes, it will automatically rebuild.
This is a good chance to review the code changes that ng-micro-frontend has done for us.

## Voilà!

Visit http://localhost:4200 to see the micro frontend architecture in action.

Notice that everything is working very well this time.
The browser back and forward buttons are working.
Reloading the page on a specific route works fine as well.
Taking a look at the network tab, you can see how lazy loading works.
There's also this manifest file which tells us everything we need to know about each micro frontend.
It defines the custom element name and bundle/style locations.

## Example Fragment

We can also add micro frontend fragments using this approach:

```html
<lib-fragment baseUrl="http://localhost:4230"></lib-fragment>
```

Now you'll see mfe3 is included on every page regardless of the route.

## The Future

Next, let's get a sneak peak at a future micro frontend architecture using Module Federation.

## Clean Workspace

First, we need to rollback to before the commit we made earlier so that we can start super fresh:

```sh
git clean -fd
git reset --hard HEAD~
yarn
```

## Next Demo

[Click here for the next demo.](https://github.com/jtneal/micro-frontend-demo/blob/module-federation/DEMO.md#install-ng-module-federation)

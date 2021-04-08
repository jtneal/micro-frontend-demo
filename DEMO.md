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

## Install ng-module-federation

This time, we're going to install a package called ng-module-federation:

```sh
ng add ng-module-federation --project mfe1 --type micro --port 4210
ng add ng-module-federation --project mfe2 --type micro --port 4220
ng add ng-module-federation --project mfe3 --type micro --port 4230
ng add ng-module-federation --project shell --type shell --port 4200
```

This package is going to operate very similar to ng-micro-frontend.
Only it will be using Module Federation instead of custom elements.
This will enable us to maintain native Angular code.
For example, our micro frontend routes can now be actual children of the shell router.

## Update src/app/app.component.html

Remove this code and everything in between:

```html
  <!-- Resources -->
  ...
  </footer>
```

## Run Everything

```sh
yarn start
```

I won't have time to dig too deep into this implementation.
Let's review the changes and see how they differ from ng-micro-frontend.

## Voilà!

Visit http://localhost:4200 to see the micro frontend architecture in action.

Like before, everything works very well.
Lazy loading still works, but it's a little different now.
We load each remote entry on the initial page load.
Then we lazy load everything else once you visit a micro frontend.
The bundle sizes are also much smaller than before.

Visit http://localhost:4210 to see mfe1 in standalone mode.

Another cool thing about this approach is you can run standalone mode simultaneously.

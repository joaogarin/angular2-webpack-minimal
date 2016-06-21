/*
 * Providers provided by Angular
 */
import {provide, enableProdMode, PLATFORM_DIRECTIVES} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

// ROUTER
import { provideRouter, ROUTER_DIRECTIVES } from '@angular/router';
import { provideWebpack } from '@angularclass/webpack-toolkit';
import { routes, asyncRoutes } from './app/app.routes';

// HTTP
import {HTTP_PROVIDERS} from '@angular/http';

/*
 * App Environment Providers
 * providers that only live in certain environment
 */
if ('production' === process.env.ENV) {
  enableProdMode();
}

/*
 * App Component
 * our top level component that holds all of our components
 */
import {AppComponent} from './app/app';

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
export function main() {
  return bootstrap(AppComponent, [
    ...HTTP_PROVIDERS,
    provide(PLATFORM_DIRECTIVES, { useValue: [ROUTER_DIRECTIVES], multi: true }),
    provideRouter(routes),
    provideWebpack(asyncRoutes),
    provide(LocationStrategy, { useClass: HashLocationStrategy })
  ])
    .catch(err => console.error(err));
}


/*
 * Vendors
 * For vendors for example jQuery, Lodash, angular2-jwt just import them anywhere in your app
 * Also see custom_typings.d.ts as you also need to do `typings install x` where `x` is your module
 */


/*
 * Hot Module Reload
 * experimental version by @gdi2290
 */

function bootstrapDomReady() {
  // bootstrap after document is ready
  return document.addEventListener('DOMContentLoaded', main);
}

/*
 * Hot Module Reload
 * experimental version by @gdi2290
 */
if ('development' === ENV && HMR === true) {
  // activate hot module reload
  let ngHmr = require('angular2-hmr');
  ngHmr.hotModuleReplacement(main, module);
} else {
  // bootstrap when document is ready
  document.addEventListener('DOMContentLoaded', () => main());
}

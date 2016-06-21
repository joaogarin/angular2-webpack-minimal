import { RouterConfig } from '@angular/router';
import { HomeComponent } from './home';

export const routes: RouterConfig = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
  // make sure you match the component type string to the require in asyncRoutes
  { path: 'about', component: 'AboutComponent' },
];

// asyncRoutes is needed for our webpack-toolkit to allow us to resolve the component correctly
export const asyncRoutes = {
  'AboutComponent': require('es6-promise-loader!./about')
};

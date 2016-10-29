/*
 * Angular 2 decorators and services
 */
import {Component, OnInit} from '@angular/core';
/*
 * App Component
 * Top Level Component
 */
@Component({
  // The selector is what angular internally uses
  selector: 'wm-app', // <app></app>
  // The template for our app
  template: `
    <nav>
      <span>
        <a [routerLink]="['/']">
          Index
        </a>
      </span>
      |
      <span>
        <a [routerLink]="['/home']">
          Home
        </a>
      </span>
      |
      <span>
        <a [routerLink]="['/about']">
          About
        </a>
      </span>
    </nav>
     <main>
      <router-outlet></router-outlet>
    </main>
    <footer>
      Angular 2 app
    </footer>
    `
})
export class AppComponent {
  name: string = 'Hello Angular2';
}

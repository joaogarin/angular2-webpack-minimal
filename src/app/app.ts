/*
 * Angular 2 decorators and services
 */
import {Component, OnInit, Input} from '@angular/core';

/**
 * App State service for Hot module reloading
 */
import { AppState } from './app.service';
import {HmrState} from 'angular2-hmr';

/*
 * App Component
 * Top Level Component
 */
@Component({
    // The selector is what angular internally uses
    selector: 'wm-app', // <app></app>
    providers: [AppState],
    // The template for our app
    template: `
    <nav>
      <span>
        <a [routerLink]=" ['./'] ">
          Index
        </a>
      </span>
      |
      <span>
        <a [routerLink]=" ['./home'] ">
          Home
        </a>
      </span>
      |
      <span>
        <a [routerLink]=" ['./about'] ">
          About
        </a>
      </span>
    </nav>
     <main>
      <router-outlet></router-outlet>
    </main>
    `
})
export class AppComponent implements OnInit {
    @Input() name: string = 'Hello Angular2';
    @HmrState() counter: number;

    constructor(public appState: AppState) {
    }

    incrementCounter() {
        let newCounter = this.counter + 1;
        this.counter = newCounter;
        this.appState.set('counter', this.counter);
    }

    ngOnInit() {
        // Our API
        console.log('Initial App State', this.appState.state);
        this.counter = this.appState.state.counter;
    }
}

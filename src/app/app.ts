/*
 * Angular 2 decorators and services
 */
import {Component, OnInit} from '@angular/core';

/**
 * App State service for Hot module reloading
 */
import { AppState } from './app.service';

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
    <div>
       <h1>{{name}}</h1>
       <input [(ngModel)]="name" />
    </div>
    <br/>
    <div>
       <span>{{counter}}</span>
       <button (click)="incrementCounter()">Increment number</button>
    </div>
    `
})
export class AppComponent implements OnInit {
    name: string;
    counter: number;

    constructor(public appState: AppState) {
        this.name = 'Angular2 Minimal';
        this.counter = 0;
    }

    incrementCounter() {
        let newCounter = this.counter + 1;
        this.counter = newCounter;
    }

    ngOnInit() {
        // Our API
        console.log('Initial App State', this.appState.state);
    }
}

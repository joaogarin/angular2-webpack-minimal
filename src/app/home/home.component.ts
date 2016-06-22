/*
 * Angular 2 decorators and services
 */
import {Component, OnInit, Input} from '@angular/core';

/**
 * App State service for Hot module reloading
 */
import { AppState } from './../app.service';
import {HmrState} from 'angular2-hmr';

/*
 * Home Component
 * Top Level Component
 */
@Component({
    // The selector is what angular internally uses
    selector: 'wm-home', // <app></app>
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
export class HomeComponent implements OnInit {
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
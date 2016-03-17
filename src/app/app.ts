/*
 * Angular 2 decorators and services
 */
import {Component} from 'angular2/core';

/*
 * App Component
 * Top Level Component
 */
@Component({
    // The selector is what angular internally uses
    selector: 'app', // <app></app>
    // The template for our app
    template: `
    <div>
       <h1>{{name}}</h1>
       <input [(ngModel)]="name" />
    </div>
    <br/>
    <div>
       <span>{{counter}}</span>
       <button (click)="incrementCounter()">Increment</button>
    </div>
    `
})
export class App {
    name:string;
    counter: number;
    
    constructor(){
        this.name = "Angular2 Minimal";
        this.counter = 0;
    }
    
    incrementCounter(){
        let newCounter = this.counter + 1;
        this.counter = newCounter;
    }
    
    ngOnInit() {
        // Our API
    }
}

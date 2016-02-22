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
       My app
    </div>
    `
})
export class App {
    onInit() {
        // Our API
    }
}

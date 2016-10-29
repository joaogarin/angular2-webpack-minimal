/*
 * Angular 2 decorators and services
 */
import { Component } from '@angular/core';

/*
 * Home Component
 * Top Level Component
 */
@Component({
    // The selector is what angular internally uses
    selector: 'wm-about', // <app></app>
    // The template for our app
    template: `
    <div>
       <h1>About page</h1>
       <p>This page is : {{aboutMsg}}</p>
    </div>
    `
})
export class AboutComponent {
    aboutMsg: string = 'About';
    constructor() {
    }
}

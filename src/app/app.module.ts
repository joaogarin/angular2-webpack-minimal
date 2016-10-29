import { enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { routes } from './app.routes';

// Import the root component
import { AppComponent } from './app';
import { HomeComponent } from './home';
import { AboutComponent } from './about';

if ('production' === ENV) {
    enableProdMode();
}

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
    ],
    declarations: [
        HomeComponent,
        AboutComponent,
        AppComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

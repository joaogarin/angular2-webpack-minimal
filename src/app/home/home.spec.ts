import {
    iit,
    it,
    ddescribe,
    describe,
    expect,
    async,
    inject,
    beforeEachProviders
} from '@angular/core/testing';
import {
    TestComponentBuilder,
    ComponentFixture
} from '@angular/compiler/testing';
import { Component } from '@angular/core';

/**
 * Import the component and dependencies
 */
import {HomeComponent} from './home.component';
import { AppState } from './../app.service';

describe('App component', () => {

    // provide our implementations or mocks to the dependency injector
    beforeEachProviders(() => [
        AppState
    ]);

    @Component({
        template: ``,
        directives: [HomeComponent]
    })
    class AppTest { }

    it('shoud render with name', async(inject([TestComponentBuilder], (tcb) => {
        tcb.overrideTemplate(AppTest, '<wm-home></wm-home>')
            .createAsync(AppTest).then((fixture: ComponentFixture<AppTest>) => {
                fixture.detectChanges();
                let compiled = fixture.debugElement.nativeElement;
                expect(compiled.querySelector('h1')).toHaveText('Hello Angular2');
            });
    })));
});

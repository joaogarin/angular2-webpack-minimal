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
import {AboutComponent} from './about.component';
import { AppState } from './../app.service';

describe('App component', () => {

    // provide our implementations or mocks to the dependency injector
    beforeEachProviders(() => [
        AppState,
        AboutComponent
    ]);

    @Component({
        template: ``,
        directives: [AboutComponent]
    })
    class AppTest { }

    it('shoud render with title', async(inject([TestComponentBuilder], (tcb) => {
        tcb.overrideTemplate(AppTest, '<wm-about></wm-about>')
            .createAsync(AppTest).then((fixture: ComponentFixture<AppTest>) => {
                fixture.detectChanges();
                let compiled = fixture.debugElement.nativeElement;
                expect(compiled.querySelector('h1')).toHaveText('About page');
            });
    })));

    it('should render with lazy var', inject([AboutComponent], (about) => {
        expect(about.lazy).toEqual('lazyly');
    }));
});

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
import {AppComponent} from './app';

describe('App component', () => {

    @Component({
        template: ``,
        directives: [AppComponent]
    })
    class AppTest { }

    it('shoud render with name', async(inject([TestComponentBuilder], (tcb) => {
        tcb.overrideTemplate(AppTest, '<wm-app></wm-app>')
            .createAsync(AppTest).then((fixture: ComponentFixture<AppTest>) => {
                fixture.detectChanges();
                let compiled = fixture.debugElement.nativeElement;
                expect(compiled.querySelector('h1')).toHaveText('Hello Angular2');
            });
    })));
});

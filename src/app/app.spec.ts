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
 * Import the app component and dependency
 */
import {AppComponent} from './app';

describe('App component', () => {

    // provide our implementations or mocks to the dependency injector
    beforeEachProviders(() => [
        AppComponent
    ]);

    it('should have a name', inject([AppComponent], (app) => {
        expect(app.name).toEqual('Hello Angular2');
    }));
});

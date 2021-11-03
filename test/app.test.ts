
import { App } from '../src/app';
import { expect } from 'chai';

describe('Awesome app', () => {

  it('should create an instance', () => {
    const value = new App();
    expect(value).instanceOf(App);
  });

});

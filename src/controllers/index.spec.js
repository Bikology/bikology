import {getApi} from './index';

it('getApi() should return a development URL', () => {
  expect(getApi('development', 'http://localhost:3000/')).toBe('http://localhost:8000');
  expect(getApi(undefined, 'http://localhost:3000/')).toBe('http://localhost:8000');
});

it('getApi() should return a staging URL', () => {
  expect(getApi('staging', 'https://stage.bikologi.com')).toBe('https://stage-api.bikologi.com');
});

it('getApi() should return a production URL', () => {
  expect(getApi('production', 'https://www.bikologi.com')).toBe('https://api.bikologi.com');
  expect(getApi(undefined, 'https://www.bikologi.com')).toBe('https://api.bikologi.com');
});

it('getApi() should default to production url', () => {
  expect(getApi(undefined, undefined)).toBe('https://api.bikologi.com');
});
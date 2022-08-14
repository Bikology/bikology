/**
 * getApi()
 * gets appropriate API location.
 * @param  {string} env
 * @param  {string} url
 * @return {string} api
 */
export function getApi(env, url) {
  
    let api = '';

    // if we have an enviroment, currently coming from JensonUSA as window.bikebuilderEnv
    if(env && env.length) {

      if(env === 'development') {

        api = 'http://localhost:8000';

      } else if(env === 'staging') {

        api = 'https://stage-api.bikologi.com';

      } else if(env === 'production') {

        api = 'https://api.bikologi.com'

      }
    
    // base it off the window, currently being passed as window.location.host
    } else if(url && url.length) { 

      if(url.indexOf('localhost') >= 0) {

        api = 'http://localhost:8000';

      } else {

        api = 'https://api.bikologi.com';

      }

    }

    // if we have nothing, default to prod
    if(!api.length) {

      api = 'https://api.bikologi.com';

    }

    return api;
}

const helpers = { getApi };
export default helpers;

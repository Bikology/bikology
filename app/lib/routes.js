
module.exports = function(app) {
  
    const routeCache = require('route-cache');
    const core = require('../controllers/core'); 

    // redirect
    // app.all('*',function(req,res,next){
    //   if(req.headers['x-forwarded-proto'] !== 'https' && req.headers.host.indexOf('localhost:3002') === -1){
    //     res.redirect('https://' + req.headers.host + req.url);
    //   } else {
    //     next();
    //   }
    // });

    // ui
    app.get('/', core.render);
    
    // catch-all
    app.get('*', core.notFound)
  
  }
const express = require('express')
const kill = require('kill-port')
const app = express()

// Config API settings
require('./app/lib/express')(app, express)

// Create API server
require('http').createServer(app).listen(process.env.PORT || app.get('port'), function(){
  console.log("Express APP running at localhost:3002")
})

app.listen(process.env.PORT || 3002, function () {
	console.log('App listening on port 3002');
})

process.on('SIGINT', function() {
  
  kill(3002, 'tcp')
      .then(console.log)
      .catch(console.log)
});
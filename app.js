const express = require('express')
const kill = require('kill-port')
const app = express()
const { engine } = require('express-handlebars')

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static('build'))
app.use(express.static('node_modules'))
app.use(express.static('views'))


app.get('/', function (req, res) {
  res.render('index', { });
})

app.listen(process.env.PORT || 3002, function () {
	console.log('App listening on port 3002');
})

process.on('SIGINT', function() {
  
  kill(3002, 'tcp')
      .then(console.log)
      .catch(console.log)
});
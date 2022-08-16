const bodyParser = require('body-parser');
const { engine } = require('express-handlebars')

module.exports = function(app, express){
    // Setup API routes
    require('./routes')(app, express)
    
    app.engine('handlebars', engine());
    app.set('view engine', 'handlebars');
    app.set('views', './app/views');
    
    app.set('trust proxy', 1);
    app.use(bodyParser.json());
    app.use(express.static(__dirname + '/public'))
    app.use(express.static('build'))
    app.use(express.static('node_modules'))

}
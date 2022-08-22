const bodyParser = require('body-parser');
const path = require('path');
const { engine } = require('express-handlebars')

module.exports = function(app, express){
    
    app.engine('handlebars', engine({ 
        extname: 'hbs', 
        defaultLayout: 'main', 
        layoutsDir: './app/views/layouts/',
        partialsDir: './app/views/partials/'
    }));

    app.set('view engine', 'handlebars');
    app.set('views', './app/views');
    
    app.set('trust proxy', 1);
    app.use(bodyParser.json());
	app.use(express.static(path.resolve('./public')));

    // Setup API routes
    require('./routes')(app, express)
}
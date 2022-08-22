exports.render = function(req, res) {
	res.render('index.handlebars', {});
};

exports.notFound = function(req, res) {
	res.render('404.handlebars', {});
};
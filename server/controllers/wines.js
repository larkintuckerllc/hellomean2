var mongoose = require('mongoose');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
mongoose.connect('mongodb://localhost/winedb');

var Schema = mongoose.Schema;
var wineSchema = new Schema({
	name: String
});
var Wine = mongoose.model('Wine', wineSchema);

Wine.schema.path('name').validate(function(value) {
	return !(value == null || value == '');	
}, 'Invalid name');

exports.findAll = function(req, res) {
	Wine.find(function(err, wines) {
		if (!err) {
			res.send(wines);
		} else {
			res.statusCode = 500;
			res.send('500');
		}
	});
};
 
exports.findById = function(req, res) {
	var _id = req.params._id;
	Wine.findById(_id, function(err, wine) {
		if (!err) {
			if (wine) {	
				res.send(wine);
			} else {
				res.statusCode = 404;
				res.send('404');
			}
		} else {
			res.statusCode = 500;
			res.send('500');
		}
	});
};

exports.delete = function(req, res) {
	var _id = req.params._id;
	Wine.findByIdAndRemove(_id, function(err, wine) {
		if (!err) {
			if (wine) {	
				res.send(wine);
			} else {
				res.statusCode = 404;
				res.send('404');
			}
		} else {
			res.statusCode = 500;
			res.send('500');
		}
	});
}

 
exports.add = function(req, res) {

	// BodyParser already validates valid JSON when content-type is JSON; returns 400 on failure.

	if (req.is('application/json')) {
		var wine = new Wine({name: req.body.name});		
		wine.save(function(err) {
			if (!err) {
				res.send(wine);
			} else {
				res.statusCode = 400;
				res.send('400');
			}		
		});
	} else {
		res.statusCode = 400;
		res.send('400');
	}
}
 
exports.update = function(req, res) {

	// BodyParser already validates valid JSON when content-type is JSON; returns 400 on failure.

	if (req.is('application/json')) {
		var _id = req.params._id;
		Wine.findById(_id, function(err, wine) {
			if (!err) {
				if (wine) {	
					wine.name = req.body.name;
					wine.save(function(err) {
						if (!err) {
							res.send(wine);
						} else {
							res.statusCode = 400;
							res.send('400');
						}		
					});
				} else {
					res.statusCode = 404;
					res.send('404');
				}
			} else {
				res.statusCode = 500;
				res.send('500');
			}
		});
	} else {
		res.statusCode = 400;
		res.send('400');
	}
}

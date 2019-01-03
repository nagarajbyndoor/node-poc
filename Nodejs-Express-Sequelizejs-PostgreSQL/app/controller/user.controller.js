const db = require('../config/db.config.js');
const User = db.users;

exports.create = (req, res) => {	
	// Save to PostgreSQL database
	User.create({
				"email": req.body.email, 
				"password": req.body.password
			}).then(user => {		
			// Send created profile to client
			res.json(user);
		}).catch(err => {
			console.log(err);
			res.status(500).json({msg: "error", details: err});
		});
    console.log(user);
};

// FETCH All Users
exports.findAll = (req, res) => {
	User.findAll().then(users => {
			// Send All users to Client
			res.json(users.sort(function(c1, c2){return c1.id - c2.id}));
		}).catch(err => {
			console.log(err);
			res.status(500).json({msg: "error", details: err});
		});
};


exports.findByName = (req, res) => {
	User.findOne({ where: {email: req.params.email} }).then(users => {
			// Send valid users to Client
			res.json(users);
		}).catch(err => {
			console.log(err);
			res.status(500).json({msg: "error", details: err});
		});
};
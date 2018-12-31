const db = require('../config/db.config.js');
const Profile = db.profiles;

// Post a Profile
exports.create = (req, res) => {	
	// Save to PostgreSQL database
	Profile.create({
				"firstname": req.body.firstname, 
				"lastname": req.body.lastname, 
				"age": req.body.age,
                "profileId": req.body.profileId,
                "phone": req.body.phone,
                "email": req.body.email,
                "role": req.body.role,
                "city": req.body.city,
                "state": req.body.state,
                "skills": req.body.skills,
                "ranking": req.body.ranking,
                "reviews": req.body.reviews,
                "imagePath": req.body.imagePath
			}).then(profile => {		
			// Send created profile to client
			res.json(profile);
		}).catch(err => {
			console.log(err);
			res.status(500).json({msg: "error", details: err});
		});
};
 
// FETCH All Profiles
exports.findAll = (req, res) => {
	Profile.findAll().then(profiles => {
			// Send All profiles to Client
			res.json(profiles.sort(function(c1, c2){return c1.id - c2.id}));
		}).catch(err => {
			console.log(err);
			res.status(500).json({msg: "error", details: err});
		});
};

// Find a Profile by Id
exports.findById = (req, res) => {	
	Profile.findById(req.params.id).then(profile => {
			res.json(profile);
		}).catch(err => {
			console.log(err);
			res.status(500).json({msg: "error", details: err});
		});
};
 
// Update a Profile
exports.update = (req, res) => {
	const id = req.body.id;
	Profile.update( req.body, 
			{ where: {id: id} }).then(() => {
				res.status(200).json( { mgs: "Updated Successfully -> profile Id = " + id } );
			}).catch(err => {
				console.log(err);
				res.status(500).json({msg: "error", details: err});
			});
};

// Delete a Profile by Id
exports.delete = (req, res) => {
	const id = req.params.id;
	Profile.destroy({
			where: { id: id }
		}).then(() => {
			res.status(200).json( { msg: 'Deleted Successfully -> profile Id = ' + id } );
		}).catch(err => {
			console.log(err);
			res.status(500).json({msg: "error", details: err});
		});
};
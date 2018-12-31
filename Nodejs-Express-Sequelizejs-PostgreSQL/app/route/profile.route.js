module.exports = function(app) {
    const profiles = require('../controller/profile.controller.js');
 
    // Create a new profile
    app.post('/api/profiles', profiles.create);
 
    // Retrieve all profile
    app.get('/api/profiles', profiles.findAll);
 
    // Retrieve a single profile by Id
    app.get('/api/profiles/:id', profiles.findById);
 
    // Update a profile with Id
    app.put('/api/profiles', profiles.update);
 
    // Delete a profile with Id
    app.delete('/api/profiles/:id', profiles.delete);
}
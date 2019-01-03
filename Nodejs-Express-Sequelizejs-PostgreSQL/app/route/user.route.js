module.exports = function(app) {
    const users = require('../controller/user.controller.js');
 
    // Create a new profile
    app.post('/api/users', users.create);
 
    // Retrieve all profile
    app.get('/api/users', users.findAll);
    
    // Retrieve all profile
    app.get('/api/users/:email', users.findByName);

}


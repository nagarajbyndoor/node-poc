module.exports = (sequelize, Sequelize) => {
	const Profile = sequelize.define('profile', {
	  firstname: {
			type: Sequelize.STRING
	  },
	  lastname: {
			type: Sequelize.STRING
	  },
      age: {
		  type: Sequelize.INTEGER
	  },
	  profileId: {
		  type: Sequelize.STRING
	  },
      phone: {
		  type: Sequelize.STRING
	  },
      email: {
		  type: Sequelize.STRING
	  },
      role: {
		  type: Sequelize.STRING
	  },
      city: {
		  type: Sequelize.STRING
	  },
      state: {
		  type: Sequelize.STRING
	  },
      skills: {
		  type: Sequelize.STRING
	  },
      ranking: {
		  type: Sequelize.INTEGER
	  },
      reviews: {
		  type: Sequelize.STRING
	  },
      imagePath: {
		  type: Sequelize.STRING
	  }
	});
	
	return Profile;
}
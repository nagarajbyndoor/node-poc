var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())
 
const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}
 
app.use(cors(corsOptions))
 
const db = require('./app/config/db.config.js');
  
// force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
  initial();
});
 
require('./app/route/profile.route.js')(app);
require('./app/route/user.route.js')(app);
 
// Create a Server
var server = app.listen(8080, function () {
 
  let host = server.address().address
  let port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port);
})

 function initial(){
 
   let profiles = [
     {
       firstname: "Joe",
       lastname: "Thomas",
       age: 36,
       profileId: "Joe2019",
       phone: "9827109267",
       email: "info1@dummy.com",
       role: "UI Developer",
       city: "Bangalore",
       state: "Karnataka",
       skills: "Angular, ReactJS, JavaScript, HTML5, CSS3, Bootstrap and Git",
       ranking: 8,
       reviews: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacinia ligula sollicitudin lectus congue sagittis. Donec nec maximus mauris, sed finibus lectus. Etiam consequat eu mauris non suscipit.",
       imagePath: "./assets/cust-1.jpeg"
     },
     {
       firstname: "Peter",
       lastname: "Smith",
       age: 18,
       profileID: "Peter2019",
       phone: "9162734321",
       email: "info2@dummy.com",
       role: "Business Analyst",
       city: "Delhi",
       state: "Delhi",
       skills: "Etiam, consequat eu, mauris, non and suscipit",
       ranking: 7,
       reviews: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacinia ligula sollicitudin lectus congue sagittis. Donec nec maximus mauris, sed finibus lectus. Etiam consequat eu mauris non suscipit.",
       imagePath: "./assets/cust-2.jpeg"
     },
     {
       firstname: "Lauren",
       lastname: "Taylor",
       age: 31,
       profileId: "Lauren2019",
       phone: "8912625141",
       email: "info3@dummy.com",
       role: "UX and UI Designer",
       city: "Pune",
       state: "Maharastra",
       skills: "Photoshop,HTML5, CSS3, Bootstrap and Git",
       ranking: 7,
       reviews: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacinia ligula sollicitudin lectus congue sagittis. Donec nec maximus mauris, sed finibus lectus. Etiam consequat eu mauris non suscipit.",
       imagePath: "./assets/cust-3.jpeg"
     },
     {
       firstname: "Mary",
       lastname: "Taylor",
       age: 24,
       profileId: "Mary2019",
       phone: "9162539085",
       email: "info4@dummy.com",
       role: ".Net Developer",
       city: "Chenai",
       state: "Tamilnadu",
       skills: ">Net Core, C#, mySQl, WebApi and Git",
       ranking: 8,
       reviews: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacinia ligula sollicitudin lectus congue sagittis. Donec nec maximus mauris, sed finibus lectus. Etiam consequat eu mauris non suscipit.",
       imagePath: "./assets/cust-4.jpeg"
     },
     {
       firstname: "David",
       lastname: "Moore",
       age: 25,
       profileId: "David2019",
       phone: "9012735216",
       email: "info5@dummy.com",
       role: "Ruby Developer",
       city: "Bangalore",
       state: "Bangalore",
       skills: "India",
       ranking: 7,
       reviews: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacinia ligula sollicitudin lectus congue sagittis. Donec nec maximus mauris, sed finibus lectus. Etiam consequat eu mauris non suscipit.",
       imagePath: "./assets/cust-5.jpeg"
     },
     {
       firstname: "Holly",
       lastname: "Davies",
       age: 27,
       profileId: "Holly2019",
       phone: "9532487590",
       email: "info6@dummy.com",
       role: "Java Developer",
       city: "Goa",
       state: "Goa",
       skills: "Etiam, consequat eu, mauris, non and suscipit",
       ranking: 9,
       reviews: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacinia ligula sollicitudin lectus congue sagittis. Donec nec maximus mauris, sed finibus lectus. Etiam consequat eu mauris non suscipit.",
       imagePath: "./assets/cust-6.jpeg"
     },
     {
       firstname: "Michael",
       lastname: "Brown",
       age: 45,
       profileId: "Michael2019",
       phone: "8724671524",
       email: "info7@dummy.com",
       role: "Software Tester",
       city: "Udupi",
       state: "Karnataka",
       skills: "Manualt Testing, Selenium, QTP, Cocumber and Jenkyn",
       ranking: 8,
       reviews: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacinia ligula sollicitudin lectus congue sagittis. Donec nec maximus mauris, sed finibus lectus. Etiam consequat eu mauris non suscipit.",
       imagePath: "./assets/cust-7.jpeg"
     }
   ]
   let users = [
       {
        email: "admin@admin.com",
        password: "admin@123"
       },
       {
        email: "admin1@admin.com",
        password: "admin1@123"
       } 
   ]
 
   // Init data -> save to MySQL
   const Profile = db.profiles;
   for (let i = 0; i < profiles.length; i++) { 
     Profile.create(profiles[i]);  
   }
    
   const User = db.users;
   for (let i = 0; i < users.length; i++) { 
     User.create(users[i]);  
   }
 }
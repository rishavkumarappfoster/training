const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");


const app = express();

var corsOptions = {
  origin: true
};


app.set('view engine', 'ejs');
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
app.use(cookieParser());

//adding public 
app.use(express.static('public'));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.render('pages/index');
});

app.get("/user", (req, res) => {
  res.render('pages/user');
});

app.get("/user/:id/project", (req, res) => {
  res.render('pages/project');
});


require("./app/routes/tutorial.routes")(app);
const userroute = require('./app/routes/user.routes.js');
app.use('/api/users', userroute);

const authuser = require('./app/routes/auth.routes.js');
app.use('/api/auth', authuser);


// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

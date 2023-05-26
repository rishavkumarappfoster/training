// const faker = require('faker');
// const db = require("../models");
// const express = require("express");
// const cors = require("cors");

// const app = express();

// var corsOptions = {
//   origin: true
// };

// //create main model
// const User = db.users
// const Project = db.projects


// // Connect to the database
// const dbConfig = require("../config/db.config.js");

// const Sequelize = require("sequelize");
// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//   host: dbConfig.HOST,
//   dialect: dbConfig.dialect,
//   operatorsAliases: false,

//   pool: {
//     max: dbConfig.pool.max,
//     min: dbConfig.pool.min,
//     acquire: dbConfig.pool.acquire,
//     idle: dbConfig.pool.idle
//   }
// });


// db.sequelize.sync()
//   .then(() => {
//     console.log("Synced db.");
//   })
//   .catch((err) => {
//     console.log("Failed to sync db: " + err.message);
//   });


// // Create 10 users with projects
// app.get('/seed', async (req, res) => {
//     try {
//       await sequelize.sync({ force: true }); // Drops and recreates tables
  
//       for (let i = 0; i < 10; i++) {
//         const user = await User.create({
//             name: faker.name.findName(),
//             email: faker.internet.email(),
//             gender: faker.random.arrayElement(['Male', 'Female']),
//             status: faker.random.arrayElement(['active', 'inactive']),
//         });
  
//         const numProjects = faker.datatype.number({ min: 1, max: 5 });
//         for (let j = 0; j < numProjects; j++) {
//           await Project.create({
//             name: faker.lorem.word(),
//           description: faker.lorem.sentence(),
//           UserId: user.id,
//           });
//         }
//       }
  
//       res.send('Seeding complete!');
//     } catch (error) {
//       console.error('Error seeding the database:', error);
//       res.status(500).send('Error seeding the database');
//     }
//   });
  
//   // Start the server
//   // set port, listen for requests
// const PORT = process.env.PORT || 3000;
//   app.listen(PORT, () => {
//     console.log('Server is running on port 3000');
//   });

// module.exports = async function () {
//   try {
//     await sequelize.sync({ force: true }); // Drops and recreates tables

//     for (let i = 0; i < 10; i++) {
//       const user = await User.create({
//         name: faker.name.findName(),
//         email: faker.internet.email(),
//         gender: faker.random.arrayElement(['Male', 'Female']),
//         status: faker.random.arrayElement(['active', 'inactive']),
//       });

//       const numProjects = faker.datatype.number({ min: 1, max: 5 });
//       for (let j = 0; j < numProjects; j++) {
//         await Project.create({
//           title: faker.lorem.sentence(),
//           description: faker.lorem.paragraph(),
//           UserId: user.id,
//         });
//       }
//     }

//     console.log('Seeding complete!');
//   } catch (error) {
//     console.error('Error seeding the database:', error.message);
//   }
// };


// For additional practice, you can:

// Update the seed data in the app.js file to include additional people and movies.
// Explore the other data relationship types that we didn't cover in this course, like many-to-many and one-to-one. For more information, see Sequelize's documentation on Associations.
// Complete a challenge exercise by adding a many-to-many relationship between the Movie and Person models for a movie's actors.
// We've already provided the necessary seed data for the Person records.
// Add the necessary associations to the Movie and Person models.
// Update the seed data and queries in the app.js file.

















'use strict';

const { sequelize, models } = require('./db');

// Get references to our models.
const { Person, Movie } = models;

// Define variables for the people and movies.

// NOTE: We'll use these variables to assist with the creation
// of our related data after we've defined the relationships
// (or associations) between our models.
let bradBird;
let vinDiesel;
let eliMarienthal;
let craigTNelson;
let hollyHunter;
let theIronGiant;
let theIncredibles;

console.log('Testing the connection to the database...');

(async () => {
  try {
    await sequelize.authenticate();
    // Test the connection to the database
    console.log('Connection to the database successful!');

    // Sync the models
    console.log('Synchronizing the models with the database...');
    await sequelize.sync({ force: true });


    // Add People to the Database
    console.log('Adding people to the database...');

    const peopleInstances = await Promise.all([ 

    Person.create({
      firstName: 'Brad',
      lastName: 'Bird',
    }),

    Person.create({
      firstName: 'Vin',
      lastName: 'Diesel',
    }),
    Person.create({
      firstName: 'Eli',
      lastName: 'Marienthal',
    }),
    Person.create({
      firstName: 'Craig T.',
      lastName: 'Nelson',
    }),
    Person.create({
      firstName: 'Holly',
      lastName: 'Hunter',
    }),
  ]);
  
  console.log(JSON.stringify(peopleInstances, null, 2));



    // Update the global variables for the people instances

    [bradBird, vinDiesel, eliMarienthal, craigTNelson, hollyHunter] = peopleInstances;

    // Add Movies to the Database
    console.log('Adding movies to the database...');

    const movieInstances = await Promise.all([
    
    Movie.create(
      {
        title: 'The Iron Giant',
        releaseYear: 1999,
        directorPersonId: bradBird.id,
      }
    ),
    Movie.create(
     {
        title: 'The Incredibles',
        releaseYear: 2004,
        directorPersonId: bradBird.id,
       }
      ),
    ]);

    console.log(JSON.stringify(movieInstances, null, 2));

    // Retrieve movies
    const movies = await Movie.findAll({
      include: [
        {
          model: Person,//associates the movie model instances with the Person model
          as: 'director',
        },
      ],
    });
    
    console.log(movies.map( movie => movie.get({ plain:true })));

    // Retrieve people
  const people = await Person.findAll({
      include: [
        {
          model: Movie,
          as: 'director',
        },
    ],
  });

  console.log(JSON.stringify(people, null, 2));
  
  // console.log(people.map( person => person.get({ plain: true })));




    process.exit();
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      console.error('Validation errors: ', errors);
    } else {
      throw error;
    }
  }
})();
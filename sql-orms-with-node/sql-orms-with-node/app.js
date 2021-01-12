const db = require('./db');

const {Movie, Person} = db.models;
// const { Op } = db.Sequelize;

//async IIFE
(async ()=> {
    
    await db.sequelize.sync( { force: true} );

    try {
        //testing connection
        // const test = await sequelize.authenticate();
        // console.log('Connection to the database succesful!');

    const dbInstances = await Promise.all([

        Movie.create({
            title: "Boy in the striped pyjama's",
            runtime: 94,
            releaseDate: "2008-11-26",
            isAvailableOnVHS: false,
        }),
        
        Movie.create({
            title: "Jurassic Park",
            runtime: 128,
            releaseDate: "1993-06-11",
            isAvailableOnVHS: true,
        }),

        Person.create({
            firstName: "David",
            lastName: "Kane",
        }),        
    ]);
    // const dbJSON = dbInstances.map(db => db.toJSON());
    // console.log(dbJSON);

    //store a promise results in variable and convert instance to JSON to log. (log will be exactly like other instances)  
    // const movieByID = await Movie.findByPk(1);
    // console.log(movieByID.toJSON());
    //SELECT * FROM movies WHERE id = 1

    //Alternatively, if you just want a specific element (e.g. runtime) you use findOne():
    
    // const movieRuntime = await Movie.findOne( { where: { runtime: 128 } });
    // console.log(movieRuntime.toJSON())
    //SELECT * FROM movies WHERE runtime = 128

    // const movies = await Movie.findAll();
    // console.log( movies.map(movie => movie.toJSON()) );

    //SELECT * FROM movies

    //findAll()  can take options as well. e.g. findAll(
        // { attributes: ['id', 'title'], // return only id }and title
        //  { where: {    
    //     lastName: "Kane",
    //     [optional]another condition: ""
    // }})

    // const movies = await Movie.findAll({
    //     attributes: ['id', 'title'],
    //     where: {
    //       title: {
    //         [Op.endsWith]: 'Park'
    //       },        
    //     },
    //     order: [['id', 'DESC']] // IDs in descending order
    //   });
    //   console.log( movies.map(movie => movie.toJSON()) );

    




    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            // if the error is the above, map over the error items and returns an array holding error messages and log.
            const errors = error.errors.map((err ) => 
                err.message );
                console.error('Validation errors: ', errors);
        } else {
            //catch all other (unforeseen) errors
            throw error;
        }
    }
})();













// //typical requiring
// const Sequelize = require ('sequelize');
// //typical initializing
// const sequelize = new Sequelize({
//     //dialect: sqlite, mariaDB etc
//     dialect: 'sqlite',
//     //creating database named 'movies'
//     storage: 'movies.db',
//     logging: true//false = disable logging
// });

// class Movie extends Sequelize.Model {
     
// }
// //Inititalizes the class instance we just made so we can configure the model:
// //The init() takes two arguments: one object literal for the COLUMNS and another object literal for OPTIONS (only required option is a sequelize property that defines the sequelize instance to attach to the model)
// Movie.init({
//     //must add data-type
//     title: Sequelize.STRING
// },
//     {sequelize} 
// );  





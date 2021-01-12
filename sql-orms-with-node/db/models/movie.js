const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Movie extends Sequelize.Model {}
  Movie.init({
      //set custom primary key
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: `Please provide a value for "title" movie`, 
            }
            ,notEmpty: {
                msg: `Please provide a value for "title" movie`,
            },
        },
    },
    runtime: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: `Please provide a value for "runtime" movie`, 
            },
            min: {
                args: 1,
                msg: `Please provide a value greater than "0" for "runtime"`,
            },
        },
    },
    releaseDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
            notNull: {
                msg: `Please provide a value for "releaseDate" movie`, 
            },
            isAfter: {
                args: `1895-12-27`,
                msg: `Please provide a date after "1895-12-27" for "releaseDate"`,
            }
        },
    },
    isAvailableOnVHS: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
  }, 
  //Model options object
  { 
    // modelName: 'movie', //stores in sequelize.models under name 'movie'. Change table name to 'movies'
    //tableName: 'my_movies_table', //table name change
    // timestamps: false,
    // freezeTableName: true, //diable plural table names
    sequelize 
  }); 

  return Movie;
};
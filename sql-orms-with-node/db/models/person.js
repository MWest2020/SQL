const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Person extends Sequelize.Model {}
  Person.init({
      //set custom primary key
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: `Please provide a value for "firstName" movie`, 
            },
            notEmpty: {
                msg: `Please provide a value for "firstName" movie`,
            },
        },
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: `Please provide a value for "lastName" movie`, 
            },
            notEmpty: {
                msg: `Please provide a value for "lastName" movie`,
            },
        },
    },
  }, 
  { 
    sequelize 
  }); 

  return Person;
};
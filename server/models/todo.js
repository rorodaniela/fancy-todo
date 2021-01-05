'use strict';
const {
  Model, DATEONLY, DATE
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User, {foreignKey: 'userID'})
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate : {
        notEmpty: {
          msg: "Title cannot be empty!"
        }
      }
    },
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    userID:DataTypes.INTEGER,
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isDate:{
          args: true,
          msg: "Input must be date in format YYYY-MM-DD"
        },
        isAfter: {
          args: new Date().toString(),
          msg: "Date must be greater than today"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    user: DataTypes.STRING,
    pass: DataTypes.STRING
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};
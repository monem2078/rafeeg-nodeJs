'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        roleId: DataTypes.INTEGER,
        password: DataTypes.STRING,
        resetPasswordToken: DataTypes.STRING,
        resetPasswordExpires: DataTypes.DATE
    }, {});
    User.associate = function(models) {
        User.belongsTo(models.Role, {
            as: 'role',
            foreignKey: 'roleId'
        });
    };
    User.beforeCreate(user => user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null));
    return User;
};
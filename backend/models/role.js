'use strict';
module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
        name: DataTypes.STRING
    }, {});
    Role.associate = function(models) {
        Role.hasMany(models.User, { as: 'users', foreignKey: 'roleId' });
        Role.belongsToMany(models.Permission, {through:'RolePermissions', as:'permissions', foreignKey:'roleId'});
    };
    return Role; 
};
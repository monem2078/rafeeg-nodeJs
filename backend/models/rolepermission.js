'use strict';
module.exports = (sequelize, DataTypes) => {
    const RolePermission = sequelize.define('RolePermission', {
        roleId: DataTypes.STRING,
        permissionId: DataTypes.STRING
    }, {});
    RolePermission.associate = function(models) {
        RolePermission.belongsTo(models.Role,{as:'role', foreignKey: 'roleId'});
        RolePermission.belongsTo(models.Permission,{as:'permission'});
    };
    return RolePermission;
};
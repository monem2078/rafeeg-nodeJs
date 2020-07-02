'use strict';

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('RolePermissions', [
            {
                roleId: 1,
                permissionId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                roleId: 1,
                permissionId: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                roleId: 1,
                permissionId: 3,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                roleId: 1,
                permissionId: 4,
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ], {});
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete('RolePermissions', null, {});
    }
};

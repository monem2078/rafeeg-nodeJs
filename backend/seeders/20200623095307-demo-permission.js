'use strict';

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('Permissions', [
            {
                name: 'roles-create',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'roles-update',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'roles-destroy',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'roles-index',
                createdAt: new Date(),
                updatedAt: new Date()
            },

        ]);
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete('Permissions', null, {});
    }
};

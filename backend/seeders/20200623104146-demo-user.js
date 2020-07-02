'use strict';
const bcrypt = require('bcrypt');

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('Users', [{
            firstName: 'mohamed',
            lastName: 'monem',
            email: 'mohamed.monem2078@gmail.com',
            roleId: 1,
            password: bcrypt.hashSync('test', bcrypt.genSaltSync(10), null),
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};

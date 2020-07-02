const userParser = require('../authentication/parsers/userParser');
const permissionParser = require('./permissionParser');

exports.index = (roles) => {
    const list = [];
    roles.map((role) => {
        return list.push(this.show(role));
    });
    
    return list;
};

exports.create = (role) => {
    return {
        message: 'Role created successfully',
        role: {
            id: role.id,
            name: role.name,
        }
    };
};

exports.update = (role) => {
    return {
        message: 'Role updated successfully',
        role: {
            id: role.id,
            name: role.name,
        }
    };
};

exports.show = (role) => {
    return {
        id: role.id,
        name: role.name,
        users: role.users.map((user) => {
            return userParser.user(user);
        }),
        permissions: role.permissions.map((permission) => {
            return permissionParser.show(permission);
        })
    };
};
const Role = require('../models').Role;
const User = require('../models').User;
const Permission = require('../models').Permission;
const RolePermission = require('../models').RolePermission;
const parser = require('../parsers/roleParser');

exports.index = async (req, res) => {
    const roles = await Role.findAll({ include: [
        {
            model: User,
            as: 'users'
        },
        {
            model: Permission,
            as: 'permissions'
        }
    ] });
    res.status(200).send(parser.index(roles));
};

exports.store = async (req, res) => {
    const role = await Role.create(req.body);
    await this.addPermissions(role.id, req.body.permissions, 'create');
    res.status(201).send(parser.create(role));
};

exports.update = async (req, res) => {
    const role = await Role.findOne({where: { id: req.params.id }});
    await role.update({name: req.body.name});
    await this.addPermissions(role.id, req.body.permissions, 'update');
    res.status(200).send(parser.update(role));
};

exports.destroy = async (req, res) => {
    const role = await Role.findOne({where: { id: req.params.id }});
    await role.destroy();
    res.status(200).send({message: 'Role deleted.'});

};

exports.addPermissions = async (roleId, permissionIds, type) => {
    // remove all permission assign to specific role.
    type != 'create' ? await RolePermission.destroy({ where: { roleId: roleId } }) : '';

    // assign permissions to specific role.
    await permissionIds.map((permissionId) => {
        RolePermission.create({roleId, permissionId});
    }); 
};
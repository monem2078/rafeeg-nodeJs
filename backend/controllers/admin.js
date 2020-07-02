const User = require('../models').User;
const Role = require('../models').Role;
const parser = require('../parsers/adminParser');

exports.index = async (req, res) => {
    // get all user that not customer or service provider.
    const admins = await User.findAll({
        include: [
            {
                model: Role,
                as: 'role',
                where: {name: 'super-admin'}
            }
        ]
    });
    res.status(200).send(parser.index(admins));
};

exports.create = async (req, res) => {
    // check if unique email.
    const emailExists = await User.findOne({where: { email: req.body.email }});
    if (emailExists) return res.status(404).send({message: 'Email already userd.'});

    // sign up new user.
    const admin = await User.create(req.body);
    res.status(201).send(parser.create(admin));
};

exports.update = async (req, res) => {
    // check if unique email.
    const adminId = req.params.adminId;
    const emailExists = await User.findOne({where: {email: req.body.email, id: {$not: adminId}}});
    if (emailExists) return res.status(404).send({message: 'Email already userd.'});

    const admin = await User.findOne({where: {id: adminId}});
    await admin.update(req.body);

};

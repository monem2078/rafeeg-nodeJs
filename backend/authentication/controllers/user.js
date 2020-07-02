const User = require('../../models').User;
const Role = require('../../models').Role;
const Permission = require('../../models').Permission;
const parser = require('../parsers/userParser');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const {initMail} = require('../helpers/mailHelpers');

exports.signIn = async (req, res) => {
    // check if email exists.
    const user = await User.findOne({where: { email: req.body.email }, include: [{
        model: Role,
        as: 'role',
        include: [{
            model: Permission,
            attribute: ['name'], 
            as: 'permissions'
        }]
    }]});
    if (!user) return res.status(404).send({message: 'No user found.'});

    // check if wrong password.
    const passwordIsValid = await bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    // login response.
    res.status(200).send(parser.signIn(user.dataValues));
};

exports.forgotPw = async (req, res) => {
    // generate reset pw token.
    const token = crypto.randomBytes(20).toString('hex');

    // get the user by email and add the token to user record.
    const user = await User.findOne({where: {email: req.body.email}});
    if (!user) return res.status(404).send({message: 'No user found.'});
    await user.update({resetPasswordToken: token, resetPasswordExpires: Date.now() + 3600000});
        
    // send email to the user with the reset link
    await initMail(user, token, req.headers.host);
    res.status(200).send({message: 'An e-mail has been sent to ' + user.email + ' with a link to change the password.'});
};

exports.saveNewPw = async (req, res) => {
    const user = await User.findOne({ where: { resetPasswordToken: req.params.token } });

    if (user.resetPasswordExpires < Date.now()) {
        console.log('error', 'Password reset token has expired.');
        return res.status(408).send({ msg: 'Rest password token expired' });
    } else {
        await user.update({
            password: await bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null),
            resetPasswordToken: undefined,
            resetPasswordExpires: undefined,
        });
        return res.status(200).send({ msg: 'Password changed successfully' });
    }

};
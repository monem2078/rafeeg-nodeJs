var jwt = require('jsonwebtoken');

exports.signUp = (user) => {
    const token = jwt.sign(user, 'rafeeg');

    return {
        message: 'User Created Successfully',
        user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token
        }  
    };
};

exports.signIn = (user) => {
    const token = jwt.sign(user, 'rafeeg');

    return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token
    };
};

exports.user = (user) => {
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    };
};
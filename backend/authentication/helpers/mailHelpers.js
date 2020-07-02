var nodemailer = require('nodemailer');

exports.initMail = async (user, token, host) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'billy3@ethereal.email',
            pass: '7KsU9sqJvgQBQtFhsb'
        }
    });
    const mailOptions = {
        to: user.email,
        from: 'billy3@ethereal.email',
        subject: 'Change Password',
        text: 'This email allows you to change your password.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + host + '/auth/reset/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    };
    await transporter.sendMail(mailOptions);
};
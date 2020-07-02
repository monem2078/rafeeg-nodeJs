module.exports = (req, res, next) => {
    const user = req.user;
    const resource = req.originalUrl.split('/')[2];
    const action = req.originalUrl.split('/')[3];
    user.role.permissions.find(permission => permission.name == `${resource}-${action}`) ? next() : res.status(401).send({message: 'unauthorized'});
};
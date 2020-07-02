exports.index = (admins) => {
    const list = [];
    admins.map((admin) => {
        return list.push(this.show(admin));
    });
    
    return list;
};

exports.create = (admin) => {
    return {
        message: 'Admin created successfully',
        admin: {
            id: admin.id,
            firstName: admin.firstName,
            lastName: admin.lastName,
            email: admin.email,
        }
    };
};

exports.show = (admin) => {
    return {
        id: admin.id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        role: admin.role.name
    };
};
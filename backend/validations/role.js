
const Joi = require('joi');

module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if (result.error) {
                return res.status(400).send(result.error);
            }

            if (!req.value) { req.value = {}; }
            req.value['body'] = result.value;
            next();
        };
    },

    schemas: {
        create: Joi.object().keys({
            name: Joi.string().required(),
            parmission: Joi.array().required()
        }),
        update: Joi.object().keys({
            name: Joi.string().required(),
            parmission: Joi.array().required()
        }),
    },
};
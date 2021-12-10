const Joi = require('joi');

const validate = {
    addMentor: Joi.object({
        name: Joi.string().required(),
    }),
    addStudent: Joi.object({
        name: Joi.string().required(),
    }),
    assignStudent: Joi.object({
        student: Joi.string().required(),
    }),
    changeMentor: Joi.object({
        name: Joi.string().required(),
        mentor: Joi.string().required(),
    }),
}

module.exports = validate;
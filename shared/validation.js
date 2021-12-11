const Joi = require('joi');

const validate = {
    createRoom:Joi.object({
        name: Joi.string().required(),
        seats: Joi.number().required(),
        amenities: Joi.string().required(),
        price: Joi.number().required(),
    }),
    bookRoom:Joi.object({
        customerName: Joi.string().required(),
        date: Joi.date().required(),
        startTime: Joi.date().required(),
        endTime: Joi.date().required(),
    }),
}

module.exports = validate;
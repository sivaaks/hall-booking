const crypto = require('crypto');
const jwt= require('jsonwebtoken');

const misc={
    dateTime: new Date().toString('dd-MM-yyyy hh:mm:ss'),
}

module.exports = misc;
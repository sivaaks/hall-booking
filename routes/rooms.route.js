const route = require('express').Router();
const service= require('../services/rooms.service');

route.post('/',service.createRoom);
route.post('/booking/:roomId',service.bookRoom);
route.get('/',service.getRoomsWithBookedData);
route.get('/customers',service.getRoomsWithCustomerdData);

module.exports= route;

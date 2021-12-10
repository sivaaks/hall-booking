const route = require('express').Router();
const service= require('../services/mentor.service');

route.post('/',service.addMentor);
route.delete('/:id',service.deleteMentor);
route.put('/assign',service.assignStudents);
route.get('/students',service.getStudents);
route.get('/',service.getMentors);

module.exports= route;

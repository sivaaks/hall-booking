const route = require('express').Router();
const service= require('../services/student.service');

route.post('/',service.addStudent);
route.delete('/:id',service.deleteStudent);
route.put('/assign',service.changeMentor);
route.put('/change',service.changeMentor);
route.get('/swom',service.getStudentsWithoutMentor);
route.get('/',service.getAllStudents);

module.exports= route;

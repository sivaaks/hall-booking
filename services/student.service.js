const db=require('../shared/db.connect');
const {addStudent,assignStudent,changeMentor}=require('../shared/validation');
const {dateTime,getTokenDetails,randomString} = require('../shared/utils');
const {ObjectId}= require('mongodb');

const urls={

    async addStudent(req,res){

        try{
            //validate data
            const {error,value}= addStudent.validate(req.body);
            if(error) return res.status(400).send({
                error:'Validation failed',
                message:error.details[0].message,
            })
            const student= await db.student.findOne({name:value.name});
            if(student) return res.status(200).send('Student already added');
            const data= await db.student.insertOne({...value,mentor:null,createdAt:dateTime});
            return res.status(200).send(data);
        }catch(err){
            console.log(`Add student error ${err}`);
        }
    },

    async assignMentor(req,res){
        try{
            const {error,value}= assignStudent.validate({id:req.params.id});
            if(error) return res.status(400).send({
                error:'Validation failed',
                message:error.details[0].message,
            })
            const mentor=await db.student.findOne({name:req.body.name});
            if(mentor.length>0) return res.status(200).send('Mentor already exists for this student');;
            const data= await db.student.findOneAndUpdate({name:req.body.name},{$set:{mentor:req.body.mentor}});
            res.status(200).send(data);
        }catch(err){
            console.log(err);
        }
    },

    async getStudentsWithoutMentor(req,res){
        try{
            const data= await db.student.find({mentor:null}).sort({createdAt:1}).toArray();
            return res.status(200).send(data);
        }catch(err){
            console.log(`Get Students without mentor error: ${err}`);
        }
    },

    async getAllStudents(req,res){
        try{
            const data= await db.student.find({}).sort({createdAt:1}).toArray();
            return res.status(200).send(data);
        }catch(err){
            console.log(`Get Students error: ${err}`);
        }
    },

    async changeMentor(req,res){
        try{
            const mentorOfStudent=await db.student.findOne({_id:ObjectId(req.body.id)});
            const currentMentor=await db.mentor.findOne({name:mentorOfStudent.mentor});
            const studentName=await db.student.findOne({_id:ObjectId(req.body.id)});
            const selectedValue=svalue=>svalue===studentName.name;
            try {
            const index=currentMentor.students.findIndex(selectedValue);
            const studentsList=currentMentor.students.splice(index,1);
            studentsList.splice(index,1);
            await db.mentor.updateOne({name:mentorOfStudent.mentor},{$set:{students:studentsList}});
            } catch(err) {
            }
            const newMentor=req.body.value;
            const studentsOfNewMentor=await db.mentor.findOne({name:newMentor});
            if (!studentsOfNewMentor.students.includes(studentName.name)) studentsOfNewMentor.students.push(studentName.name);
            await db.mentor.updateOne({name:newMentor},{$set:{students:studentsOfNewMentor.students}});
            const data= await db.student.updateOne({_id:ObjectId(req.body.id)},{$set:{mentor:req.body.value}});
            res.status(200).send(data);
        }catch(err){
            res.status(400).send('Unable to change mentor, please try again later');
            console.log(err);
        }
    },
   
    async deleteStudent(req,res){
        try{
            const data= await db.student.deleteOne({_id:ObjectId(req.params.id)});
            res.status(200).send(data);
        }catch(err){
            console.log(err);
        }
    },

}

module.exports= urls;
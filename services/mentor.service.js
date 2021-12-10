const db=require('../shared/db.connect');
const {addMentor,assignStudent,updateEvent}=require('../shared/validation');
const {dateTime,getTokenDetails,randomString} = require('../shared/utils');
const {ObjectId}= require('mongodb');

const urls={

    async addMentor(req,res){

        try{
            //validate data
            const {error,value}= addMentor.validate(req.body);
            if(error) return res.status(400).send({
                error:'Validation failed',
                message:error.details[0].message,
            })
            const mentor= await db.mentor.findOne({name:value.name});
            if(mentor) return res.status(200).send('Mentor already added');
            const data= await db.mentor.insertOne({...value,students:[],createdAt:dateTime});
            return res.status(200).send(data);
        }catch(err){
            console.log(`Add mentor error ${err}`);
        }
    },

    async assignStudents(req,res){
        try{
            const currentStudents= await db.mentor.findOne({_id:ObjectId(req.body.id)});
            const updatedStudents=[...currentStudents.students,...req.body.value];
            const data= await db.mentor.updateOne({_id:ObjectId(req.body.id)},{$set:{students:updatedStudents}});
            const mentorName= await db.mentor.findOne({_id:ObjectId(req.body.id)});
            req.body.value.map(async(student)=>{
                await db.student.updateOne({name:student},{$set:{mentor:mentorName.name}});
            })
            res.status(200).send(data);
        }catch(err){
            console.log(err);
        }
    },
   
    async getStudents(req,res){
        try{
            const data= await db.mentor.find({name:req.body.name}).sort({createdAt:1}).toArray();
            return res.status(200).send(data.students);
        }catch(err){
            console.log(`Get URL error: ${err}`);
        }
    },

    async getMentors(req,res){
        try{
            const data= await db.mentor.find({}).sort({createdAt:1}).toArray();
            return res.status(200).send(data);
        }catch(err){
            console.log(`Get URL error: ${err}`);
        }
    },


    async deleteMentor(req,res){
        try{
            const data= await db.mentor.deleteOne({_id:ObjectId(req.params.id)});
            res.status(200).send(data);
        }catch(err){
            console.log(err);
        }
    },
    
}

module.exports= urls;
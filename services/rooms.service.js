const db=require('../shared/db.connect');
const {createRoom,bookRoom}=require('../shared/validation');
const {dateTime} = require('../shared/utils');
const {ObjectId}= require('mongodb');

const rooms={

    async createRoom(req,res){

        try{
            //validate data
            const {error,value}= createRoom.validate(req.body);
            if(error) return res.status(400).send({
                error:'Validation failed',
                message:error.details[0].message,
            })
            const room= await db.rooms.findOne({name:value.name});
            if(room) return res.status(200).send('Room already added');
            const data= await db.rooms.insertOne({...value,createdAt:dateTime});
            return res.status(200).send(data);
        }catch(err){
            console.log(`Create room error ${err}`);
        }

    },

    async bookRoom(req,res){

        try{
            //validate data
            const {error,value}= bookRoom.validate(req.body);
            if(error) return res.status(400).send({
                error:'Validation failed',
                message:error.details[0].message,
            })
            const roomId=req.params.roomId;
            if(roomId.length<24) return res.status(200).send('RoomID invalid');
            const roomIdCheck=await db.rooms.findOne({_id:ObjectId(roomId)});
            console.log('room id check',roomIdCheck);
            if(!roomIdCheck) return res.status(200).send('RoomID invalid');
            const room= await db.bookings.find({startTime:{$gte:new Date(value.startTime),$lt:new Date(value.endTime)},date:new Date(value.date)}).toArray();
            if(room.length>0) return res.status(200).send('Room already booked for this date and time');
            const data= await db.bookings.insertOne({...value,roomName:roomIdCheck.name,bookedStatus:'Booked',createdAt:dateTime});
            return res.status(200).send(data);
        }catch(err){
            console.log(`Book room error ${err}`);
        }

    },

    async getRoomsWithBookedData(req,res){
        try{
            const data= await db.bookings.find({}).sort({createdAt:1}).project({_id:0,customerName:1,date:1,startTime:1,endTime:1,roomName:1,bookedStatus:1}).toArray();
            return res.status(200).send(data);
        }catch(err){
            console.log(`Get Students without mentor error: ${err}`);
        }
    },

    async getRoomsWithCustomerdData(req,res){
        try{
            const data= await db.bookings.find({}).sort({createdAt:1}).project({_id:0,customerName:1,date:1,startTime:1,endTime:1,roomName:1}).toArray();
            return res.status(200).send(data);
        }catch(err){
            console.log(`Get Students without mentor error: ${err}`);
        }
    },

   async getRoomName(roomId){
        try{
            const roomName= await db.rooms.findOne({_id:ObjectId(roomId)});
            return roomName.name;
        } catch(err){

        }
    },

}

module.exports= rooms;
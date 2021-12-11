const {MongoClient} = require('mongodb');

//const DB_URL= 'mongodb://localhost:27017';
const DB_URL='mongodb+srv://admin:admin@cluster0.icp5l.mongodb.net/hall-booking?retryWrites=true&w=majority'
const DB_NAME='hall-booking';

const client= new MongoClient(DB_URL);

module.exports={
    
    //db names
    db:null,
    rooms:null,
    bookings:null,

    //connect to db
    async connect(){
        try{
            client.connect();

            this.db= client.db(DB_NAME);

            this.rooms= this.db.collection('rooms');
            this.bookings= this.db.collection('bookings');

            console.log('db ready');

        } catch(err){
            console.log(`Error connecting to db ${err}`);
        }
    }

}
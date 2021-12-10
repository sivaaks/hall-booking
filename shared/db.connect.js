const {MongoClient} = require('mongodb');

//const DB_URL= 'mongodb://localhost:27017';
const DB_URL='mongodb+srv://admin:admin@cluster0.icp5l.mongodb.net/assign-mentor?retryWrites=true&w=majority'
const DB_NAME='assign-mentor';

const client= new MongoClient(DB_URL);

module.exports={
    
    //db names
    db:null,
    mentor:null,
    student:null,

    //connect to db
    async connect(){
        try{
            client.connect();

            this.db= client.db(DB_NAME);

            this.student= this.db.collection('student');
            this.mentor= this.db.collection('mentor');

            console.log('db ready');

        } catch(err){
            console.log(`Error connecting to db ${err}`);
        }
    }

}
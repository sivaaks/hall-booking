const express= require('express');
const cors=require('cors');
const db= require('./shared/db.connect');

const roomsRoute= require('./routes/rooms.route');

const app= express();
const PORT=3001;

(async()=>{
    try{
        await db.connect();

        app.use(cors({
            origin:['http://localhost:3000','https://siva-assign-mentor.netlify.app']
        }))
        app.use(express.json());

       // app.use(authTokenCheck);
        
        app.use('/rooms',roomsRoute);
        
        app.listen(process.env.PORT||PORT);

    } catch(err){
        console.log(`Error: ${err}`);
    }
})();





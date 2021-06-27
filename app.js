const dotenv = require('dotenv')
const path = require('path')
const express = require('express');
const app = express();
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config({path:'./config.env'})

app.use(express.json())

const PORT = process.env.PORT

const dbPath = path.join(__dirname,"userDetails.db")


let db;

const initializeDataBaseAndServer = async()=>{
    try{
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });
        app.listen(PORT, ()=>{
            console.log(`server is running at port no ${PORT} and Connected to DB`)
        })
    }catch(e){
        console.log(`DB error ${e.message}`)
        process.exit(1);
    }
};

initializeDataBaseAndServer()

app.post('/register', async (req,res)=>{
    const {name,username,phone,password,Cpassword} = req.body
    const hashedPassword = await bcrypt.hash(password,10);
    const hashedCpassword = await bcrypt.hash(Cpassword,10);
    const selectUserQuery = `SELECT * FROM user WHERE username='${username}';`;
    const dbUser = await db.get(selectUserQuery);
    if(!name || !username || !phone || !password || !Cpassword){
        res.status(422).json({Error: "Pls fill all the Details"})
    }
    if(dbUser === undefined){
        const createUserQuery = `
        INSERT INTO 
        user(name,username,phone,password,Cpassword) 
        values(
            '${name}',
            '${username}',
            '${phone}',
            '${hashedPassword}',
            '${hashedCpassword}'            
        );
        `;
        await db.run(createUserQuery)
        res.status(200).json({message:"User Created Successfully"})
    }else{
        res.status(422).json({Error:"User Already exits"})
    }
})

app.post('/signIn',async(req,res)=>{
    const {username,password} = req.body
    const selectUserQuery = `select * from user Where username='${username}';`;
    const dbUser = await db.get(selectUserQuery)
    if(!username || !password){
         res.status(400).json({error:"plz enter the details"})
    }
    else if(dbUser===undefined){
        res.status(400).json({error:"Invalid username or password"})
    }else{
        const isPasswordMatch = await bcrypt.compare(password,dbUser.password)
        if(isPasswordMatch){
            const payload = {
                username:username
            }
            const jwtToken = jwt.sign(payload,process.env.SECRET_KEY)
            res.status(200).json({jwt_token:jwtToken})
        }else{
            res.status(400).json({error:"Invalid username or password"})
        }
    }

})


if(process.env.NODE_ENV=="production"){
    app.use(express.static(path.join(__dirname,"/client/build")));

    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'client','build','index.html'))
    })
}else{
    app.get('/',(req,res)=>{
        res.send('Api running')
    });
}




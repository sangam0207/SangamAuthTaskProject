const express=require('express');
const dotenv=require('dotenv');
const cors=require('cors')
const router=require('./routes/router')
const cookieParser=require('cookie-parser')
const app=express();
const port=8000;
require('./db/conn');
app.use(express.json());
app.use(cookieParser())
app.use(cors());
app.use(router)

app.listen(port,()=>{
    console.log(`server is start at port number ${port}`)
})
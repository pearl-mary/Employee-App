// Task1: initiate app and run server at 3000

const express = require("express");
const app = new express();
const mongoose = require("mongoose");
const EMPModel = require("../src/model/employeeDB.js");

app.use(express.json());
app.use(express.urlencoded({extended : true}));

const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));

// Task2: create mongoDB connection 
mongoose.connect('mongodb+srv://pearltom:<hn.Hmd7!xeLJBPN>@cluster0.rqz4jdj.mongodb.net/?retryWrites=true&w=majority'),
{ useNewUrlParser: true }

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below

// Find 404 and hand over to error handler
app.use(( next) => {
    next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
    console.error(err.message) // Log error message in our server's console
    if (!err.statusCode) err.statusCode = 500 // If err has no specified error code, set error code to 'Internal Server Error (500)'
    res.status(err.statusCode).send(err.message) // All HTTP requests must have a response, so let's send back an error with its status code and message
})

const createError = require('http-errors');


//TODO: get data from db  using api '/api/employeelist'

app.get("/api/employeelist", async(res) =>{
    try{
        const data = await EMPModel.find();
        console.log("Data from user input=", data);
        res.send(data);
    }
    catch(err){
        console.log(`Error ${err}`);
    }
})


//TODO: get single data from db  using api '/api/employeelist/:id'

app.get("/api/employeelist/:id", async(req,res) =>{
    try{
        const data = await EMPModel.findById(req.params.id);
        console.log("Data from User",data);
        res.send(data);
    }
    catch(err){
        console.log(`Single data access error${err}`);
    }
})


//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post("/api/employeelist", async (req,res)=>{
    try{
        const item = req.body;
        console.log("Data from User input=",item);
        const user = new EMPModel(item);
        const memberUser = await user.save();
        res.send(memberUser);
    }
    catch(err){
        console.log(`Sending Error ${err}`);
    }
})



//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete("/api/employeelist/:id",async (req,res)=>{
    try {
        const data = await EMPModel.deleteOne(
            {
                "id":req.params.id
            })
        console.log("Delete data from userinterface=",data);
        res.send(data);
    } catch (err) {
        console.log(`Error in deleting ${err}`)
    }
})



//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put('/api/employeelist',async (req,res)=>{
    try {
        const data = await EMPModel.findByIdAndUpdate(
            {
                "_id":req.body._id,
            },
            {
                $set : {
                    "name" : req.body.name,
                    "location" : req.body.location,
                    "position" : req.body.position,
                    "salary" : req.body.salary
                }
            }
        );
        console.log("Data updated through userinterface=",data);
        res.send(data);
    } catch (err) {
        console.log(`Error in Updation ${err}`);
    }
})

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});

app.listen(3000, ()=>{
    console.log("Server Connected to Port 3000");
});
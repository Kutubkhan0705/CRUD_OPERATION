const express = require('express'); //express, mongoose, cors tino ka use Server Banane 
const mongoose = require('mongoose');//ke liye aur Api routes create karne ke liye
const cors = require('cors'); 


const UserModel = require('./models/Users') //ye mongoDb collection ka schema model hai

const app = express(); //express application create karne ke liye
app.use(cors()) //middleware
app.use(express.json()) //json data ko read karne ke liye

mongoose.connect("mongodb://127.0.0.1:27017/crud") //MongoDB database se connect ke karne ke liye

app.get('/', (req, res) => {  //Database se saare users laane ke liye
    UserModel.find({})          
        .then(users => {
            console.log(users)
            res.json(users)
        })
})

app.get('/getUser/:id', (req, res) => {  //ek specific user ka data lane ke liye
    const id = req.params.id;
    UserModel.findById({ _id: id })
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({ _id: id }, {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    }).
        then(users => res.json(users))
        .catch(err => res.json(err))
})

app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id: id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
    
})

app.post("/createUser", (req, res) => {
    UserModel.create(req.body).then(users => res.json(users))
})

app.listen(3001, () => {
    console.log("server is Running!")
})
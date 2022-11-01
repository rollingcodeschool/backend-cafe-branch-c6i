import mongoose from "mongoose";

// localhost: 127.0.0.1
// const url = 'mongodb://localhost:27017/cafe-branch'; //BD-local
// const url = 'mongodb+srv://nunicho:jnup@MjxQwNP2Q4@cluster0.b8sgvyv.mongodb.net/cafe-branch';
const url = 'mongodb+srv://emi:emi2020@cluster0.xgqs3sk.mongodb.net/cafe-branch-c6i';

mongoose.connect(url);

const connection = mongoose.connection;

connection.once('open',()=>{
    console.log('BD conectada')
})
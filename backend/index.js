const express = require('express')
const app = express()
const port = 5000
const connectDB = require('./db')
app.use('/upload', express.static('upload'));


app.use((req,res,next) =>{
    res.setHeader("Access-control-Allow-Origin","http://localhost:3000");
res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
);
next()
})
connectDB();

app.use(express.json())
app.use('/api',require("./Routes/CreateUser"));
app.use('/api',require("./Routes/DisplayData"));
app.use('/api',require("./Routes/OrderData"));


app.get('/',(req,res) =>{
    res.send("hello world")
})

app.listen(port,() =>{
    console.log(`example app listeing on port ${port}`);
})

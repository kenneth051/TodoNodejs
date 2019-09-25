var express=require("express")
var app=express()
var bodyParser = require("body-parser")
var mongoose=require('mongoose');
import router from "./app/routes"
app.use(bodyParser.json())
mongoose.connect('mongodb://localhost:27017/todo',{ useNewUrlParser: true });
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/',router);
app.listen(3000);
console.log("achieved connection on port 3000");

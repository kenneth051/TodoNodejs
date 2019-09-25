import express from "express"
var bodyparser=require('body-parser');
var router=express.Router();
var encode=bodyparser.urlencoded({extended:false});
import Auth from "./api/auth"
import TodoView from "./api/todo"
import VerifyToken from "./verifyToken"

router.post('/create',encode,Auth.CreateAccount)
router.post('/login',Auth.Login)
router.post('/todo',VerifyToken,TodoView.CreateTodo)
router.get('/todo',VerifyToken,TodoView.getAll)
router.get('/todo/:id',VerifyToken,TodoView.singleTodo)
router.delete('/todo/:id',VerifyToken,TodoView.deleteTodo)
router.put('/todo/:id',VerifyToken,TodoView.updateTodo)

export default router
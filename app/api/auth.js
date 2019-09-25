import jwt from 'jsonwebtoken';
import Validate from "../Validate"
import User from "../model/auth_model"
export default class Auth{
    static CreateAccount(req,res){
        var data=req.body;
        var valid=new Validate(data);
        var empty=valid.isEmpty()
        var password=valid.PasswordLength()
        var stringCharacters=valid.validateStrings()
        if (empty.length>=1){
            return res.status(400).send(empty)
        }
        else if(password){
            return res.status(400).send(password)
        }
        else if(stringCharacters.length>=1){
            return res.status(400).send(stringCharacters)
        }
        var user=new User({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            username:req.body.username,
            password:req.body.password
        })
        User.findOne({"username":user.username},(err,data)=>{
            if (data ==null){
                User.createUser(user,(err,data)=>{
                    if (err){
                        return res.status(400).send({"error":"you encoutered an error saving your data"})
                    }else{
                        return res.status(201).send({"success":"data saved successfully"})
                    }
                })

            }else{
                return res.status(400).send({"error":"User with that username already exists"})
            }

        })
        
    }
    static Login(req,res){
        var user={ username:req.body.username,
                       password:req.body.password}
        User.findOne({"username":user.username},(err,data)=>{
            if(err){
                return res.status(400).send({"error":"user with that username and passowrd doesnt exist"})
            }
            if(data){
            if(data.password==user.password){
                var token =jwt.sign(
                    { user:user.username},
                    'secretkey',
                    {expiresIn:'5hr'}
                );
                var returnedObj={
                    token:token,
                    success:"user logged in successfully"

                }
                return res.status(200).send(returnedObj)
            }else{
                return res.status(400).send({"error":"user with that username and passowrd doesnt exist"})

            }
        }
        })
        

    }
}
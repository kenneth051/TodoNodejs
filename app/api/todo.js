import Todos from "../model/todo_model"
export default class TodoView{
    static CreateTodo(req,res){

    if (req.body.todo==null){
        res.status(400).send({error:"todo feild must not be empty"})
    }
    else{
        if(req.user){
            var current_todo= new Todos({
                username:req.user.username,
                todo:req.body.todo
            })
            Todos.findOne({"todo":current_todo.todo},(err,data)=>{
                
                if(!data || data.username!=req.user.user){
                    try{
                        current_todo.save()
                    res.status(201).send({success:"todo saved successfully"})
                    }catch{
                        res.status(400).send({errors:"error saving data"})
                    }
                }else{
                    res.status(400).send({error:"you already saved this todo"})
                }
            })
    }
        }

    }
    static getAll(req,res){
        Todos.find({username:req.user.user},(err,data)=>{
            if (err){
                return res.status(400).send({error:"error fetching todos"})
            }
            return res.status(200).send({results:data})
        })
    }
    static singleTodo(req,res){
        Todos.findOne({_id:req.params.id,username:req.user.user},(err,data)=>{
            if(data){
                return res.status(200).send({results:data})
            }else{
                return res.status(400).send({error:"error getting todo"})
            }
        })


    }
    static deleteTodo(req,res){
        Todos.findByIdAndRemove({_id:req.params.id,username:req.user.user},(err,data)=>{
            if(data){
                return res.status(200).send({results:"successfully deleted todo"})
            }else{
                return res.status(400).send({error:"error deleting todo"})
            }
        })
    }
    static updateTodo(req,res){
        Todos.findByIdAndUpdate({_id:req.params.id,username:req.user.user},{todo:req.body.todo},{new: true},(err,data)=>{
            if(data){
                return res.status(200).send({success:data})
            }else{
                return res.status(400).send({error:"error updating todo"})
            }
        })
    }
}
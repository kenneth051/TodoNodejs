var mongoose=require('mongoose');
var todoSchema=mongoose.Schema({
    username:{
        type:String
    },
    todo:{
        type:String
    }
});
var Todos = module.exports=mongoose.model('Todos',todoSchema);
module.exports.createTodo = function(newTodo, callback){
    newTodo.save(callback);
}
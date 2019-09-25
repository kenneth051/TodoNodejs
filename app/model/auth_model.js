var mongoose=require('mongoose');
var userSchema=mongoose.Schema({
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    username:{
        type:String
    },
    password:{
        type:String
    }
});
var User=module.exports=mongoose.model('User',userSchema);
module.exports.createUser = function(newUser, callback){
    newUser.save(callback);
}
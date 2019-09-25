class Validate{
    constructor(data){
        this.data=data;
    }
    isEmpty(){
        let error;
        var errorList=[]
        Object.entries(this.data).forEach(([key, value]) => {
            if(value.trim().length<1){
                error =`${key} is required`;
                errorList.push(error)
            }
        });
        return errorList;

    }
    PasswordLength(){
        if (this.data.password.length<8){
            return "Password should be 8 character or more" 
        }
    }
    validateStrings(){
        var info={firstname:this.data.firstname,lastname:this.data.lastname}
        var errorList=[]
        Object.entries(info).forEach(([key, value]) => {
            if(!/^[a-zA-Z]+$/.test(value)){
                var error =`${key} should only have alphabetical characters`;
                errorList.push(error)
            }
            });
            return errorList;
    }
    
 }
 export default Validate;
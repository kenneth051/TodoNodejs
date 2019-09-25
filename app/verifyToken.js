import jwt from 'jsonwebtoken';
const VerifyToken = (req,res,next)=>{
   const token = req.headers['authorization'];
   const error = ()=>{
       return res.status(405).send({
           error: 'Not authenticated. Please add token.'
       });
   };
   if(typeof token === 'undefined'){
       return error();
   }
   if (!token){
       return error();
   }
   req.token = token;
   jwt.verify(req.token, 'secretkey', (err,user)=>{
       if(err){
           return res.status(405).send({
               error: err
           });
       }
       req.user=user;
       return next();
   });
};
export default VerifyToken;
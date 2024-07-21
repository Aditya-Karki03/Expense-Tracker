import express from 'express';
const app=express();
const signingRouter=express.Router()

signingRouter.get('/',(req,res)=>{
    res.send('This is from the signing in/up request')
})

export default signingRouter;

import express from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken'
const expensesRouter=express.Router();
const prisma=new PrismaClient();

interface userIdTypeOne{
    data:string,
    iat:string
}

type userIdType=userIdTypeOne | null

expensesRouter.post('/',async(req,res)=>{
    const response=req.headers;
    const token=response.authorization || '';
    let userId:userIdType
    if(token!=='' && !token){
        userId=jwt.decode(token)
        console.log(userId.data)
    }
    
    return res.json({
        msg:"Done"
    })
    // const {amount, date, category, description}=req.body;
    // const userId=jwt.decode(token)

})



export default expensesRouter;

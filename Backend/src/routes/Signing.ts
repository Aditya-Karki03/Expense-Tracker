import express from 'express';
import { PrismaClient } from '@prisma/client';
import zod from 'zod'
const app=express();
const prisma=new PrismaClient();
const signingRouter=express.Router()


//parse the body without the help of bodyparser(external library)
 signingRouter.use(express.json())

const UserSigningUpDataValidator=zod.object({
    email:zod.string().email({message:'Invalid Email Address'}),
    firstname:zod.string().min(2),
    lastname:zod.string().min(2),
    password:zod.string().min(8,{message:'Password should be minimum 8 characters!'})
})

signingRouter.post('/signup',async(req,res)=>{
    const userData=req.body;
    
    try {
       const {success}=UserSigningUpDataValidator.safeParse(userData)
       if(!success){
            res.status(400)
            return res.json({
                msg:'You Sent Wrong Input!'
            })
       }

       const userCreated=await prisma.users.create({
            data:userData
       })

    } catch (error) {
        res.status(400);
        return res.json({
            msg:"Server Error!! Please try again!"
        })
    }
})

const userSignInDataValidator=zod.object({
    email:zod.string().email({message:'Invalid Email Address'}),
    password:zod.string().min(8,{message:'Password should be minimum 8 characters!'})
})

signingRouter.post('/signin',async(req,res)=>{
    const userData=req.body
    try {
        const{success}=userSignInDataValidator.safeParse(userData);
        if(!success){
            res.status(400)
            return res.json({
                msg:'Wrong input format!! Please try again!'
            })
        }

        const findUserData=await prisma.users.findFirst({
            where:{
                email:userData.firstname,
                password:userData.password
            }
        })
        if(!findUserData){
            res.status(401)
            return res.json({
                msg:"No User Found!! Please try signing Up"
            })
        }
        res.status(200)
        return res.json({
            msg:"User found successfully!!"
        })
        
    } catch (error) {
        res.status(500);
        return res.json({
            msg:"Server Error!! Please try again!"
        })
    }
})

export default signingRouter;

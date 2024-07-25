import express from 'express';
import { PrismaClient } from '@prisma/client';
import jwt, { sign } from 'jsonwebtoken'
import zod from 'zod'
import axios from 'axios';

const app=express();
const prisma=new PrismaClient();
const signingRouter=express.Router()

const secretKey:string=process.env.SECRET_KEY || '';

signingRouter.use(express.json())

// Just a trial for google outh2.0
const GOOGLE_OAUTH_URL=process.env.GOOGLE_OAUTH_URL;
const GOOGLE_CLIENT_ID=process.env.GOOGLE_CLIENT_ID;
const GOOGLE_ACCESS_TOKEN_URL=process.env.GOOGLE_ACCESS_TOKEN_URL;
const GOOGLE_CLIENT_SECRET=process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK_URL='http://localhost:3000/api/v1/user/google/callback'
const GOOGLE_OAUTH_SCOPES=[
    "https%3A//www.googleapis.com/auth/userinfo.email",

    "https%3A//www.googleapis.com/auth/userinfo.profile",
]

signingRouter.get('/',async(req,res)=>{
    const state='some_state';
    const scopes=GOOGLE_OAUTH_SCOPES.join(' ');
    const GOOGLE_OAUTH_CONSENT_SCREEN_URL = `${GOOGLE_OAUTH_URL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_CALLBACK_URL}&access_type=offline&response_type=code&state=${state}&scope=${scopes}`;
    res.redirect(GOOGLE_OAUTH_CONSENT_SCREEN_URL);
})

signingRouter.get('/google/callback',async(req,res)=>{
    console.log(req.query);
    const {code}=req.query;
    const data={
        code,
        client_id:GOOGLE_CLIENT_ID,
        client_secret:GOOGLE_CLIENT_SECRET,
        redirect_uri:"http://localhost:3000/api/v1/user/google/callback",
        grant_type:"authorization_code"
    }
    console.log(data);
    const response=await fetch(`${GOOGLE_ACCESS_TOKEN_URL}`,{
        method:"POST",
        body:JSON.stringify(data)
    })
    const access_token_data=await response.json();

    const{id_token}=access_token_data;
    console.log(id_token);
    const token_info_response=await fetch(`${process.env.GOOGLE_TOKEN_INFO_URL}?id_token=${id_token}`)
    res.status(token_info_response.status).json(await token_info_response.json())
})

// End of trial for google outh2.0

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
       //check if the user already exist
       const userExist=await prisma.users.findFirst({
        where:{
            email:userData.email
        }
       })
       if(userExist){
            res.status(403);
            return res.json({
                msg:'Already registered Email!! Please sign in!'
            })
       }

       const userCreated=await prisma.users.create({
            data:userData
       })

    const token=jwt.sign({
        data:userCreated.id
    },secretKey)

    res.status(200);
    return res.send(token)

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
        const token=jwt.sign({
            data:findUserData.id
        },process.env.SECRET_KEY|| '')
        
        res.status(200)
        return res.send(token)
        
    } catch (error) {
        res.status(500);
        return res.json({
            msg:"Server Error!! Please try again!"
        })
    }
})

export default signingRouter;


//Also in the overview section first I need to take the user input on expenses, income and balance
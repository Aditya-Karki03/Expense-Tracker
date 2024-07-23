import express from 'express'
const app=express();
const dashboardRouter=express.Router()
const port=3000;

dashboardRouter.get('/',(req,res)=>{
    res.send('Hello from the dashboard route')
})

export default dashboardRouter
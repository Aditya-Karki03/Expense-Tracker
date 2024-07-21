import express from 'express'
import signingRouter from './routes/Signing';
const app=express();
const port=3000;

app.use('/api/v1/user/',signingRouter)

app.listen(port,()=>{
    console.log(`Port is listening at ${port}`)
})


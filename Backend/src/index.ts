import express from 'express'
import cors from 'cors'
import signingRouter from './routes/Signing';
import dashboardRouter from './routes/Dashboard';
import expensesRouter from './routes/AddExpense';
const app=express();
const port=3000;

app.use(cors())

app.use('/api/v1/user/',signingRouter);

app.use('/api/v1/user/dashboard',dashboardRouter)

app.use('/api/v1/user/addExpenses',expensesRouter)

app.listen(port,()=>{
    console.log(`Port is listening at ${port}`)
})


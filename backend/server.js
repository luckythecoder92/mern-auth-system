const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db')
const userRoute = require('./routes/user.route.js')
dotenv.config();
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.send("chal gya server")
})


app.use('/user',userRoute)


app.listen(process.env.PORT, ()=>{
    console.log("the server is running on port:",process.env.PORT)
})
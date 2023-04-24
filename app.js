const express=require('express');
const app=express();
const oracleDB=require('oracledb');
const cors = require('cors')

app.use(cors())
app.use(express.json());
app.use('/',require('./routes/login'));
app.use('/student',require('./routes/form'));
app.use('/report',require('./routes/report'));



app.listen(5000,()=>{console.log("Server listening on port 5000");});

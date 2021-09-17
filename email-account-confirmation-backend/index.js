const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const path = require('path')
require('dotenv').config();
require('./Database/db');

const PORT = process.env.PORT || 8080;
const HOST_NAME = '0.0.0.0'
const app = express();
const userRoute = require('./routes/user')



app.use(morgan('dev'));
app.use(cors({origin:'*'}))
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use('/api/user',userRoute);

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req,res)=>{
  res.sendFile(path.join(__dirname,'public/index.html'))
})

app.listen(PORT,()=>{
    console.log('Connected to Server. PORT 3000')
})


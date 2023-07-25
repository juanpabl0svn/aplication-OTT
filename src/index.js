const express = require('express');
const app = express();
const path = require('path');
const router = require('./routes/router.js')
require('dotenv').config()


const PORT = process.env.PORT || 5000


app.use('/',router)

app.use(express.static(path.join(__dirname, '..','public')))


app.listen(PORT, ()=> console.log(`Runing port ${PORT}`))

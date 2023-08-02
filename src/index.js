const express = require("express");
const app = express();
const path = require("path");
const router = require("./routes/router.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(cookieParser())

app.use("/", router);
app.use(cors());

app.use(express.static(path.join(__dirname, "..", "public")));

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'pages','error404.html'))
})

app.listen(PORT, () => console.log(`Runing in http://localhost:${PORT}`));

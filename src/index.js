require('dotenv').config();

const express = require('express');

const app = express();

app.use((req, res)=>{
 res.send("Running Successfully done Dashboard application");
});






console.log("port number", process.env.PORT);


const PORT = process.env.PORT || 8008
app.listen(PORT, ()=>{
  console.log(`Server Running Successfully`)
});
require('dotenv').config();

const express = require('express');

const app = express();

app.use((req, res)=>{
 res.send("Running Successfully");
});








const PORT = process.env.PORT || 8008
app.listen(PORT, ()=>{
  console.log(`Server Running Successfully`)
});
require('dotenv').config();

const express = require('express');

const app = express();


// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

const regsiterFormData = require('./src/routes/regsiter_routes');

const PORT = process.env.PORT || 8008


app.use('/dashboard', regsiterFormData);



app.listen(PORT, ()=>{
  console.log(`Server Running Successfully`)
});
const express = require('express');


const router = express.Router();


const {registerPostUsers} = require('../controller/register_controller');


const connectionDB = require('../config/dashboard_regsiter_db');

connectionDB(); //db connection



router.post('/regsiter', registerPostUsers);


module.exports = router
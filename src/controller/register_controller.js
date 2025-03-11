const express = require('express');

const app = express();

const crypto = require('crypto');

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));


const RegisterModel  = require('../models_schema/register_model_schema');


const connectionDB = require('../config/dashboard_regsiter_db');

connectionDB();


exports.registerPostUsers = async (req, res) => {
    try {
       
        // Destructure the request body
        const { body:{username, email, password, confirmpassword} } = req;
    
        // Validate that all required fields are present
        if (!username || !email || !password || !confirmpassword) {
            return res.status(400).json({ message: 'All fields are required' });
        }
    
        // Validate that password and confirmpassword match
        if (password !== confirmpassword) {
            return res.status(400).json({ message: 'Password and confirm password do not match' });
        }
        // Generate a random salt
        const salt = crypto.randomBytes(16).toString('hex');
    
        // Hash the password with the salt
        const iterations = 100000; // Number of iterations
        const keylen = 64; // Desired key length
        const digest = 'sha512'; // Hash function
        const hashedPassword = crypto.pbkdf2Sync(password, salt, iterations, keylen, digest).toString('hex');
        const hashedConfirmPassword = crypto.pbkdf2Sync(confirmpassword, salt, iterations, keylen, digest).toString('hex');
        // Create a new user object
        const newUser = new RegisterModel({
            username,
            email,
            password: hashedPassword,
            confirmpassword:hashedConfirmPassword
        });
    
        // Check if the user already exists
        const existingUser = await RegisterModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
    
        // Save the new user to the database
        await newUser.save();
    
        // Respond with success (avoid sending sensitive data like hashed passwords)
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err.message });
    }
};




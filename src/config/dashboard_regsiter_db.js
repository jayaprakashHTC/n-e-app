require('dotenv').config();

const mongoose = require('mongoose');

const db = 'dashboard';

const DB_URL = `${process.env.MONGO_URI}/${db}?retryWrites=true&w=majority&appName=Cluster0`;

const connectMongodb = async () => {
    try {
        console.log('The Server Is Sucessfully Connected');
        const dbconnect = await mongoose.connect(DB_URL);
        return  dbconnect.connection;
    } catch (error) {
        console.error("The MongoDB Connection Failed:", {error:error.message});
    }
};

module.exports = connectMongodb;
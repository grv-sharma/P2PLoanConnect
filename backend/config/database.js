const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`mongoDB connected: ${conn.connection.host}`);
        } catch (error) {
            console.error(`Database connection error: ${error.message}`);
            process.exit(1); // Exit the process with failure
        }
};

module.exports = connectDatabase;

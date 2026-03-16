const mongoose = require('mongoose');

const connectDB = async () => {
    mongoose.set('strictQuery', true);
    // ลบ useNewUrlParser และ useUnifiedTopology ออกไปเลย
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;
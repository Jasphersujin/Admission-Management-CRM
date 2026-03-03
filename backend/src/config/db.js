import mongoose from 'mongoose';

const connectDB = async () => {
    try {
       await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000
       })
       console.log("MongoDB Connected Sucessfully") 
    } catch (error) {
        console.log("Connection Failed", error)
        process.exit(1)   
    }
    
}

export default connectDB;
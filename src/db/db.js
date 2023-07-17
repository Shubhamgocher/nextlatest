import mongoose  from "mongoose";

 export const connectDB=async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            dbName:"nextlatest",
        });
        console.log("Database is connected")
    } catch (error) {
        console.log("Database is unable to connect",error.message);
    }

}

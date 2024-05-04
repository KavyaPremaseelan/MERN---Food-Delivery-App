import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://kavyapremaseelan:Kavya2003@cluster0.i8ipqdx.mongodb.net/mern-fooddelivery');
        console.log("DB connected");
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
};

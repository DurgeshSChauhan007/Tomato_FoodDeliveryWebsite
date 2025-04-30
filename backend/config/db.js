import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://durgeshsinghchauhan974:Upendra1974@cluster0.o1hpt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>console.log("DB connected"));

}
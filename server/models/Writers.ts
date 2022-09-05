import mongoose, { Schema } from "mongoose";
import { IWriter } from "../Types/IWriter";

  
const WriterSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true,
    },
    profilePic:{
        type:String,
        default:"",
    },
},
    {timestamps: true}
);

const Writer = mongoose.model<IWriter>("Writer", WriterSchema);
export default Writer;
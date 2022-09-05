import { Document } from "mongoose";

export interface IWriter extends Document {
  username: string;
  password: string;
  email:string;
  
}
import { IWriter } from './IWriter';
import { Document } from "mongoose";

export interface Ipost extends Document {
  title: string;
  description: string;
  author: IWriter;
}
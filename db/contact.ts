import mongoose from "mongoose";
import {Contact} from "../types.ts";

const Contact = mongoose.Schema;
const contactSchema = new Contact(
    {
        name: { type: String,required: true},
        telNumber: {type:String,required:true,unique:true},
        country: {type:String, required:true},
        localTime: {type:String, required:true}
    }
);
export type ContactModelType = mongoose.Document
export default mongoose.model<ContactModelType>("Contact", contactSchema);
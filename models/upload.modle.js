import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema({
    image: [
        {  type: String}
    ]
      
    ,
    images:[
        {
            type: String
        }
    ],
    type: {
        type: Number
    }

},{timestamps: true})

export default mongoose.model("upload",uploadSchema)
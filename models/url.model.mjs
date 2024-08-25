// url.model.mjs
import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
    shortID:{
        type:String,
        required:true,
        unique:true
    },
    redirectURL:{
        type:String,
        required:true
    },
    visitHistory: [
        {
            timeStamps: { type: Date, default: Date.now },
        }
    ],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
    }
},{timeStamps:true});

const URL = mongoose.model('URL',urlSchema);

export default URL;
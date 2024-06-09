import mongoose, { model } from "mongoose";

const conversationSchema=new mongoose.Schema({
    participants:{
       type: mongoose.Schema.Types.ObjectId,
       ref:"User",
    },
    messages:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Mesage",
        default:[],
    }
},{timestamps:true});

const Conversation=new model("Conversation",conversationSchema);
export default Conversation;
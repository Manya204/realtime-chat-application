import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import mongoose from 'mongoose';

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        // Ensure senderId and receiverId are ObjectId instances
        const senderObjectId = new mongoose.Types.ObjectId(senderId);
        const receiverObjectId = new mongoose.Types.ObjectId(receiverId);

        let conversation = await Conversation.findOne({
            participants: { $all: [senderObjectId, receiverObjectId] },
        });

        // If conversation does not exist, create a new one
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderObjectId, receiverObjectId],
                messages: [] // Initialize the messages array
            });
        }

        const newMessage = new Message({
            senderId: senderObjectId,
            receiverId: receiverObjectId,
            message,
        });


        // Push the new message ID to the conversation's messages array
        conversation.messages.push(newMessage._id);

        await Promise.all([conversation.save(),newMessage.save()]);

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage", error.message);
        res.status(500).json({ error: "Internal error" });
    }
};

export const getMessage=async(req,res)=>{
    try{

        const {id:userToChatId}=req.params;
        const senderId=req.user._id;

        const conversation=await Conversation.findOne({
            participants:{$all: [senderId,userToChatId]},
        }).populate("messages");
        
        if(!conversation)
            return res.status(200).json([]);

        const messages=conversation.messages
        res.status(200).json(messages);

    }catch{
        console.log("Error in getMessage", error.message);
        res.status(500).json({ error: "Internal error" });
    }
}

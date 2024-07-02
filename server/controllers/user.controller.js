import User from "../models/user.model.js";

export const getUsersSidebar=async (req,res)=>{
    try{

        const loggedInUser=req.user._id;
        const allUsers=await User.find({_id:{ $ne:loggedInUser}}).select("-password"); //gets all users but not the one which has login means the current user itself
        return res.status(200).json(allUsers);
    }catch{
        console.error("Error in getUsersSidebar: ",error.message)
        res.status(500).json({error:"Internal server error"})
    }
}
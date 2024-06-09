

export const sendMessage =async (req,res)=>{
    // console.log("message sent",req.params.id);

    try{
        const {message}=req.body;
        const {id}=req.params;
        const senderId=req.userId
    }catch(error){
        console.log("Error in sendMessage ",error.message);
        res.status(500).json({error:"Internal error"})
    }
}
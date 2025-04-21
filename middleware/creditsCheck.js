

export const creditsCheck=async(req,res,next)=>{
    if(req.user.credits<1){
        console.log("")
        res.status(402).json({error:"User dont have enough credits"})
    }
    next();
}
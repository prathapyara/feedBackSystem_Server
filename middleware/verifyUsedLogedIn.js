

export const verifyUsedLogedIn=(req,res,next)=>{
    if(req.user){
        next();
    }else{
        res.status(403).json({message:"user is not loggedIn"});
    }
}
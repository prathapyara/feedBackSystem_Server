

export const verifyUsedLogedIn=(req,res,next)=>{
    console.log("iam inside the middleware");
    console.log(req.user);
    if(req.user){
        next();
    }else{
        res.status(404).json({message:"user is not loggedIn"});
    }
}
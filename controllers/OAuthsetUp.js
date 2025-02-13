export const OAuthCallback=async(req,res)=>{
     res.redirect("/");
}

export const logOutUser=async(req,res)=>{
     req.logOut();
     res.send(req.user);
}
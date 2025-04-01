import { frontEndBaseurl } from "../dynamicPathSetup.js";

export const OAuthCallback=async(req,res)=>{
     
     if(!req.user){
         return res.redirect(`${frontEndBaseurl}`)
     }
     
     res.redirect(`${frontEndBaseurl}/surveys`);
}

export const logOutUser=async(req,res)=>{
     req.logOut();
     res.send(req.user);
}
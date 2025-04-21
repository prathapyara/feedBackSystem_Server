import { Router } from "express";
import { logOutUser, OAuthCallback } from "../controllers/OAuthsetUp.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import { User } from "../Models/User.js";

dotenv.config();

const router = Router();

//Serialize user to store in the session
passport.serializeUser((user, done) => {
  done(null, user.id); // Store only the user ID in the session
});

//Deserialize user when retrieving from the session
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  if (user) {
    done(null, user);
  } else {
    done(new Error("User not found"));
  }
});

// Set up Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      profile.accessToken = accessToken;
      console.log(accessToken);
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          return done(null, user);
        } else {
          const newUser = await User.create({ googleId: profile.id });
          return done(null, newUser); 
        }
      } catch (error) {
        console.log(error);
        return done(error);
      }
    }
  )
);

// Routes for Google authentication
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  OAuthCallback
);

router.get("/logout", logOutUser);

router.get("/currentUser", async (req, res) => {
  if (req.user) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(404).json({ message: "user is not found" });
  }
  
});

export default router;

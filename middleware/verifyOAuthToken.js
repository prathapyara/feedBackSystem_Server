import axios from "axios";

export const verifyOAuthToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    console.log(token);
    try {
      // Validate the token with the OAuth provider (e.g., Google)
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`
      );

      // Populate req.user with token details (e.g., user_id, scope)
      req.user = response.data;
      next();
    } catch (err) {
      res.status(403).json({ message: "Invalid or expired token" });
    }
  } else {
    res
      .status(401)
      .json({ message: "Authorization header missing or malformed" });
  }
};

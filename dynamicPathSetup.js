import dotenv from "dotenv";
dotenv.config();

export const frontEndBaseurl = process.env.FRONTEND_URL || "http://localhost:3000";
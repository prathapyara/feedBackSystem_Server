import { Router } from "express";
import { getSurveys,webhook} from "../controllers/surveyController.js";
import { createSurvey } from "../controllers/surveyController.js";
import { verifyUsedLogedIn } from "../middleware/verifyUsedLogedIn.js";
import { creditsCheck } from "../middleware/creditsCheck.js";
import { getSpecificSurvey } from "../controllers/surveyController.js";
//import { verifyOAuthToken } from "../middleware/verifyOAuthToken.js";

//verifyOAuthToken is only used for testing with the postmon
//router.post("/", verifyOAuthToken, verifyUsedLogedIn,creditsCheck, createSurvey);
//router.get("/", verifyOAuthToken,verifyUsedLogedIn, getSurveys);

const router=Router();
router.post("/", verifyUsedLogedIn,creditsCheck, createSurvey);
router.get("/",verifyUsedLogedIn, getSurveys);
router.get("/:id", verifyUsedLogedIn,getSpecificSurvey);
router.post("/webhook",webhook);
 
export default router;
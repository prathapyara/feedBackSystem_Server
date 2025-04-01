import { Router } from "express";
import { stripController,webhookController } from "../controllers/StripeController.js";
import bodyParser from "body-parser";
import { verifyUsedLogedIn } from "../middleware/verifyUsedLogedIn.js";

let router=Router();

router.post("/payments", verifyUsedLogedIn,stripController);
router.post("/webhook", bodyParser.raw({type:"application/json"}), webhookController);

export default router;
import { Router } from "express";
import auth from "../../middlewares/auth.middleware";
import * as controller from "./analytics.controller";

const router = Router();
router.use(auth);

router.get("/overview", controller.overview);
router.get("/user-performance", controller.userPerformance);
router.get("/trends", controller.trends);
router.get("/export", controller.exportCSV);

export default router;

import { Router } from "express";
import auth from "../../middlewares/auth.middleware";
import * as controller from "./comment.controller";

const router = Router();
router.use(auth);

router.post("/:taskId", controller.addComment);
router.get("/:taskId", controller.getComments);
router.put("/edit/:id", controller.updateComment);
router.delete("/:id", controller.deleteComment);

export default router;

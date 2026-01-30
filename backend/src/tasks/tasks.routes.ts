import { Router } from "express";
import auth from "../../middlewares/auth.middleware";
import * as controller from "./task.controller";
import multer from "multer";

const upload = multer({ dest: "uploads/" });
const router = Router();

router.use(auth);

router.post("/", controller.createTask);
router.post("/bulk", controller.bulkCreateTasks);

router.get("/", controller.getTasks);
router.get("/:id", controller.getTaskById);

router.put("/:id", controller.updateTask);
router.delete("/:id", controller.deleteTask);

router.post("/:id/files", upload.array("files"), controller.uploadFiles);

export default router;

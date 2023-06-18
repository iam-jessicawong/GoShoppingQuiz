import { Router } from "express";
import indexCtrl from "../controllers/indexCtrl";

const router = Router();

router.post("/", indexCtrl.orderCtrl.createOrder);
router.put("/close/:id", indexCtrl.orderCtrl.closeOrder);
router.put("/cancel/:id", indexCtrl.orderCtrl.cancelOrder);
router.get("/:username", indexCtrl.orderCtrl.findAll);

export default router;

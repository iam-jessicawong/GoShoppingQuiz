import { Router } from "express";
import indexCtrl from "../controllers/indexCtrl";

const router = Router();

router.post("/", indexCtrl.cartCtrl.addToCart);
router.get("/:username", indexCtrl.cartCtrl.findCart);

export default router;

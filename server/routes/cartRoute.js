import { Router } from "express";
import indexCtrl from "../controllers/indexCtrl";

const router = Router();

router.post("/", indexCtrl.cartCtrl.addToCart);

export default router;

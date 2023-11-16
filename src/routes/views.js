import { Router } from "express";
import { cartsView, chatView, loginView, productsView, registerView } from "../controllers/views.js";
import { publicAccess, privateAccess } from "../middlewares/access.js";

const router = Router();

router.get("/login", publicAccess, loginView);
router.get("/register", publicAccess, registerView);
router.get("/products", privateAccess, productsView);
router.get("/carts/:cid", privateAccess, cartsView);
router.get("/chat", privateAccess, chatView);

export default router;
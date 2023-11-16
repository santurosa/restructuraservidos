import { Router } from "express";
import { getCart, createCart, upgrateCart, upgrateCartByBody, updateQuantityProducts, deleteCart, deleteProductToCart } from "../controllers/carts.js";

const router = Router();


router.get("/:cid", getCart);
router.post("/", createCart);
router.put("/:cid/product/:pid", upgrateCart);
router.put("/:cid", upgrateCartByBody);
router.put("/:cid/products/:pid", updateQuantityProducts);
router.delete("/:cid", deleteCart);
router.delete("/:cid/product/:pid", deleteProductToCart);

export default router;
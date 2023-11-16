import { Router } from "express";
import { deleteProduct, getProductById, getProducts, saveProducts, upgrateProduct } from "../controllers/products.js";

const router = Router();

router.get("/", getProducts);
router.get("/:pid", getProductById);
router.post("/", saveProducts);
router.put("/:pid", upgrateProduct);
router.delete("/:pid", deleteProduct);

export default router;
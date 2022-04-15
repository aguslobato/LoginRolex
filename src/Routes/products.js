import express from "express";
import MockProducts from "../Mocks/mockProducts.js";
const router = express.Router();
const mockProducts = new MockProducts();

router.post("/", (req, res) => {
  res.json(mockProducts.productos(5));
});
router.get("/", (req, res) => {
  res.json(mockProducts.getAllProducts());
});

export default router;

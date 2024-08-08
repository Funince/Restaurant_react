import express from "express";
import {
  createMesero,
  deleteMesero,
  getAllMeseros,
  getMesero,
  updateMesero,
} from "../controllers/MeserosControllers.js";

const router = express.Router();

router.get("/", getAllMeseros);
router.get("/:id", getMesero);
router.post("/", createMesero);
router.put("/:id", updateMesero);
router.delete("/:id", deleteMesero);

export default router;

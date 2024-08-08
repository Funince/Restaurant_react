import express from "express";
import {
  createPuntuacion,
  deletePuntuacion,
  getAllPuntuaciones,
  getPuntuacion,
  updatePuntuacion,
  getAverageScores,
  getAverageScoresById,
} from "../controllers/PuntuacionesControllers.js";

const router = express.Router();

router.get("/", getAllPuntuaciones);
router.get("/avg", getAverageScores);
router.get("/avg/:id", getAverageScoresById);
router.get("/:id", getPuntuacion);
router.post("/", createPuntuacion);
router.put("/:id", updatePuntuacion);
router.delete("/:id", deletePuntuacion);



export default router;
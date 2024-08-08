import express from "express";
import {
  createCliente,
  deleteCliente,
  getAllClientes,
  getCliente,
  updateCliente,
} from "../controllers/ClientesControllers.js";

const router = express.Router();

router.get("/", getAllClientes);
router.get("/:id", getCliente);
router.post("/", createCliente);
router.put("/:id", updateCliente);
router.delete("/:id", deleteCliente);

export default router;
import PuntuacionesModel from "../models/PuntuacionesModel.js";
import db from "../database/db.js";
const extractPuntuacionData = (body) => {
  const {
    id_mesero,
    id_cliente,
    amabilidad,
    eficiencia,
    conocimiento_menu,
    tiempo_espera,
  } = body;
  return {
    id_mesero,
    id_cliente,
    amabilidad,
    eficiencia,
    conocimiento_menu,
    tiempo_espera,
  };
};
export const getAllPuntuaciones = async (req, res) => {
  try {
    const puntuaciones = await PuntuacionesModel.findAll();
    res.json({
      puntuaciones,
    });
  } catch (error) {
    res.json({
      message: "Error al obtener los datos",
      error: error.message,
    });
  }
};

export const getPuntuacion = async (req, res) => {
  const { id } = req.params;
  try {
    const puntuacion = await PuntuacionesModel.findOne({
      where: {
        id,
      },
    });
    res.json({
     puntuacion,
    });
  } catch (error) {
    res.json({
      message: "Error al obtener los datos",
      error: error.message,
    });
  }
};

export const createPuntuacion = async (req, res) => {
  const puntuacionData = extractPuntuacionData(req.body);
  try {
    const puntuacion = await PuntuacionesModel.create(puntuacionData);
    if (puntuacion) {
      res.status(201).json({
       puntuacion,
      });
    } else {
      res.json({
        message: "No se pudo crear el registro",
      });
    }
  } catch (error) {
    res.json({
      message: "Error al crear el registro",
      error: error.message,
    });
  }
};

export const updatePuntuacion = async (req, res) => {
  const { id } = req.params;
  const puntuacionData = extractPuntuacionData(req.body);
  try {
    const puntuacion = await PuntuacionesModel.update(
        puntuacionData,
      {
        where: {
          id,
        },
      }
    );
    if (puntuacion) {
      res.json({
        message: "Registro actualizado",
      });
    } else {
      res.json({
        message: "No se pudo actualizar el registro",
      });
    }
  } catch (error) {
    res.json({
      message: "Error al actualizar el registro",
      error: error.message,
    });
  }
};

export const deletePuntuacion = async (req, res) => {
  const { id } = req.params;
  try {
    const puntuacion = await PuntuacionesModel.destroy({
      where: {
        id,
      },
    });
    if (puntuacion) {
      res.json({
        message: "Registro eliminado",
      });
    } else {
      res.json({
        message: "No se pudo eliminar el registro",
      });
    }
  } catch (error) {
    res.json({
      message: "Error al eliminar el registro",
      error: error.message,
    });
  }
};

export const getAverageScores = async (req, res) => {
  try {
    const allPts = await db.query(
      "SELECT * FROM PromediosPuntuacionesPorID",
      {
        type: db.QueryTypes.SELECT,
      }
    );
    console.log("Ras:", allPts); // Log de depuración

    if (allPts.length > 0) {
      res.json({
        results: allPts,
      });
    } else {
      res
        .status(404)
        .json({ message: "No se encontraron datos para calcular promedios" });
    }
  }
  catch (error) {
    res.status(500).json({
      message: "Error al obtener los promedios",
      error: error.message,
    });
  }
}

export const getAverageScoresById = async (req, res) => {
  const { id } = req.params; // Obtener el id de los parámetros de la solicitud

  try {
    const idSpecificPointData= await db.query(
      "SELECT * FROM PromediosPuntuacionesPorID WHERE id = :id",
      {
        replacements: { id: id },
        type: db.QueryTypes.SELECT,
      }
    );
    if (idSpecificPointData) {
      res.json({
         results: idSpecificPointData
      });
    } else {
      res
        .status(404)
        .json({ message: "No se encontraron datos para el id proporcionado" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los promedios",
      error: error.message,
    });
  }
};
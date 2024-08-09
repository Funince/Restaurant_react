import MerseroModel from "../models/MeserosModel.js";

//Mostrar todos los registros

export const getAllMeseros = async (req, res) => {
  try {
    const meseros = await MerseroModel.findAll();
    res.json({
      meseros,
    });
  } catch (error) {
    res.json({
      message: "Error al obtener los datos",
      error: error.message,
    });
  }
};

//Mostrar un registro

export const getMesero = async (req, res) => {
  const { id } = req.params;
  try {
    const mesero = await MerseroModel.findOne({
      where: {
        id,
      },
    });
    res.json({
      mesero
    });
  } catch (error) {
    res.json({
      message: "Error al obtener los datos",
      error: error.message,
    });
  }
};

// Crear un registro

export const createMesero = async (req, res) => {
  const { nombres, apellidos, DNI } = req.body;
  
  try {
    
    const mesero = await MerseroModel.create({
      nombres,
      apellidos,
      DNI,
    });
    if (mesero) {
      
      res.status(201).json({
        mesero
      });
    } else {
      
      res.json({
        message: "No se pudo crear el registro",
      });
    }
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
    res.status(400).json({
      message: " Ya existe un mesero con el mismo DNI",
      error: error.message,
    });
  } else {
    res.status(400).json({
      message: "Error al crear el registro",
      error: error.message,
    });
  }
}
};

// Actualizar un registro

export const updateMesero = async (req, res) => {
  const { id } = req.params;
  try {
    const { nombres, apellidos, DNI } = req.body;
    const mesero = await MerseroModel.update(
      { nombres, apellidos, DNI },
      { where: { id } }
    );

    if (mesero) {
      res.json({
        "message": "Registro actualizado",
      });
    } else {
      res.json({
        message: "No se encontro el registro",
      });
    }
  } catch (error) {
    res.json({
      message: "Error al actualizar el registro",
      error: error.message,
    });
  }
};

// Eliminar un registro

export const deleteMesero = async (req, res) => {
  const { id } = req.params;
  try {
    const mesero = await MerseroModel.findOne({
      where: {
        id,
      },
    });
    if (mesero) {
      await mesero.destroy();
      res.json({
        message: "Registro eliminado",
      });
    } else {
      res.json({
        message: "No se encontro el registro",
      });
    }
  } catch (error) {
    res.json({
      message: "Error al eliminar el registro",
      error: error.message,
    });
  }
};
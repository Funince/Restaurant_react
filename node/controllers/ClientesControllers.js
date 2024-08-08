import ClientesModel from "../models/ClientesModel.js";

export const getAllClientes = async (req, res) => {
  try {
    const clientes = await ClientesModel.findAll();
    res.json({
      data: clientes,
    });
  } catch (error) {
    res.json({
      message: "Error al obtener los datos",
      error: error.message,
    });
  }
};
export const getCliente = async (req, res) => {
    const { id } = req.params;
    try {
        const cliente = await ClientesModel.findOne({
        where: {
            id,
        },
        });
        res.json({
        data: cliente[0],
        });
    } catch (error) {
        res.json({
        message: "Error al obtener los datos",
        error: error.message,
        });
    }
    };

    export const createCliente = async (req, res) => {
    try {
        const cliente = await ClientesModel.create();
        if (cliente) {
        res.status(201).json({
            data: cliente,
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

    //Actualizar un registro {temporalmente no hace nada}
    export const updateCliente = async (req, res) => {
    const { id } = req.params;
    const {} = req.body;
    try {
        const cliente = await ClientesModel.update( {
        where: {
            id,
        },
        });
        if (cliente) {
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
    }

    //Eliminar un registro
    export const deleteCliente = async (req, res) => {  
    const { id } = req.params;
    try {
        const cliente = await ClientesModel.destroy({
        where: {
            id,
        },
        });
        if (cliente) {
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

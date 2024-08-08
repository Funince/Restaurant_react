import axios from "axios";

const url = "http://localhost:8000/puntuaciones/avg";

export const readPuntuaciones = async () => {
    const res = await axios.get(url);
    const list = res.data.results;
    return list;
    };
export const updatePuntuacion = async (id, data) => {
    const res = await axios.put(`${url}/${id}`, data);
    return res;
    }
export const deletePuntuacion = async (id) => {
    const res = await axios.delete(`${url}/${id}`);
    return res;
    }
export const createPuntuacion = async (data) => {
    const res = await axios.post(url, data);
    return res;
    };
    
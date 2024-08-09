import axios from "axios";

const url = "http://localhost:8000/puntuaciones/avg";
const url2 = "http://localhost:8000/puntuaciones";

export const readPuntuaciones = async (signal) => {
  try {
    const res = await axios.get(url, { signal });
    const list = res.data.results;
    return list;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Request canceled", error.message);
    } else {
      console.error("Error reading puntuaciones:", error);
      throw error;
    }
  }
};

export const updatePuntuacion = async (id, data, signal) => {
  try {
    const res = await axios.put(`${url2}/${id}`, data, { signal });
    return res;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Request canceled", error.message);
    } else {
      console.error("Error updating puntuacion:", error);
      throw error;
    }
  }
};

export const deletePuntuacion = async (id, signal) => {
  try {
    const res = await axios.delete(`${url2}/${id}`, { signal });
    return res;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Request canceled", error.message);
    } else {
      console.error("Error deleting puntuacion:", error);
      throw error;
    }
  }
};

export const createPuntuacion = async (data, signal) => {
  try {
    const res = await axios.post(url2, data, { signal });
    return res;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Request canceled", error.message);
    } else {
      throw error;
    }
  }
};

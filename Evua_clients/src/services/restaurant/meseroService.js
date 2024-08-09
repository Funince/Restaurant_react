import axios from "axios";

const url = "http://localhost:8000/meseros";

export const createMesero = async (data, signal) => {
  try {
    const res = await axios.post(url, data, { signal });
    return res.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Request canceled", error.message);
    } else {

      throw error;
    }
  }
};

export const readMeseros = async (signal) => {
  try {
    const res = await axios.get(url, { signal });
    return res.data.meseros;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Request canceled", error.message);
    } else {

      throw error;
    }
  }
};

export const readMesero = async (id, signal) => {
  try {
    const res = await axios.get(`${url}/${id}`, { signal });
    return res.data.mesero;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Request canceled", error.message);
    } else {

      throw error;
    }
  }
}


export const updateMesero = async (id, data, signal) => {
  console.log(id,"data", data);
  try {
    const res = await axios.put(`${url}/${id}`, data, { signal });
    return res.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Request canceled", error.message);
    } else {

      console.error("Error updating mesero:", error);
      throw error;
    }
  }
};

export const deleteMesero = async (id, signal) => {
  try {
    const res = await axios.delete(`${url}/${id}`, { signal });
    return res.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Request canceled", error.message);
    } else {
      throw error;
    }
  }
}
import axios from "axios";

const url = "http://localhost:8000/meseros/";

export const createMesero = async (data) => {
  const res = await axios.post(url, data);
  return res;
};
export const readMeseros = async () => {
  const res = await axios.get(url);
  const list = res.data.meseros;
  return list;
};
export const updateMesero = async (id, data) => {
  const res = await axios.put(`${url}/${id}`, data);
  return res;
};
export const deleteMesero = async (id) => {
  const res = await axios.delete(`${url}/${id}`);
  return res;
};

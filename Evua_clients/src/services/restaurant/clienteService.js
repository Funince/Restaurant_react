import axios from "axios";

const url = "http://localhost:8000/clientes";

export const createCliente = async (data, signal) => {
  try {
    const res = await axios.post(url, data, { signal });
    return(res.data.data.id);
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Request canceled", error.message);
    } else {
      throw error;
    }
  }
};

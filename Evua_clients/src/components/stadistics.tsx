import { GraphRadial } from "./Grafic/graph-radial";
import { CheckBox } from "./Recepcionistas/check-box.jsx";
import { useState, useEffect } from "react";
import { readPuntuaciones } from "../components/Restaurant/Puntuaciones/ListPuntuaciones.js";
import { readMeseros } from "../components/Restaurant/Meseros/ListMeseros.js";

// Lista de recepcionistas seleccionados
export function Estadistica() {
  const [listRecept, setListRecept] = useState<Set<number>>(new Set());
  const [getMeseros, setMeseros] = useState([]);
  const [allPuntuaciones, setPuntuaciones] = useState([]);

  useEffect(() => {
    const fetchMeseros = async () => {
      try {
        const meseros = await readMeseros();
        setMeseros(meseros);
      } catch (error) {
        console.error("Error fetching meseros:", error);
      }
    };

    const fetchPuntuaciones = async () => {
      try {
        const puntuaciones = await readPuntuaciones();
        setPuntuaciones(puntuaciones);
      } catch (error) {
        console.error("Error fetching puntuaciones:", error);
      }
    };
    fetchPuntuaciones();
    fetchMeseros();
  }, []);

  console.log(getMeseros);

  const handleToggle = (id: number) => {
    setListRecept((prevListRecept) => {
      const newListRecept = new Set(prevListRecept);
      if (newListRecept.has(id)) {
        newListRecept.delete(id);
      } else {
        newListRecept.add(id);
      }
      return newListRecept;
    });
  };
  const [listPuntuaciones, setListPuntuaciones] = useState<{
    [key: number]: any;
  }>({});
  useEffect(() => {
    const newListPuntuaciones: { [key: number]: unknown } = {};
    listRecept.forEach((id) => {
      const puntuaciones = allPuntuaciones.filter(
        (element) => element.id_mesero === id
      );
      if (puntuaciones.length > 0) {
        newListPuntuaciones[id] = { ...getMeseros[id - 1], ...puntuaciones[0] };
      }
    });
    setListPuntuaciones(newListPuntuaciones);
  }, [listRecept]);

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-center ">
      <div className="min-w-[400px] overflow-auto pr-2 max-h-[80vh]">
        <div>
          <CheckBox users={getMeseros} handleToggle={handleToggle} />
        </div>
      </div>
      <div className="flex-grow">
        <GraphRadial listRecept={listPuntuaciones} />
      </div>
    </div>
  );
}

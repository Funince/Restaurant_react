import { GraphRadial } from "./Grafic/graph-radial.js";
import { CheckBox } from "../Recepcionistas/check-box.jsx";
import { useState, useEffect } from "react";
import { readPuntuaciones } from "../../services/restaurant/puntuacionesService.js";
import { readMeseros } from "../../services/restaurant/meseroService.js";
const propiedades = [
  "avg_amabilidad",
  "avg_presentacion",
  "avg_eficiencia",
  "avg_conocimiento_menu",
  "avg_tiempo_espera",
];
// Lista de recepcionistas seleccionados
export function Estadistica() {
  const [listRecept, setListRecept] = useState({});
  const [getMeseros, setMeseros] = useState([]);
  const [meserospoints, setMeserospoints] = useState([]);
  const [allPuntuaciones, setPuntuaciones] = useState({});

  useEffect(() => {
    let newPuntuaciones = {};
    const controller = new AbortController();
    const { signal } = controller;
    const newmeserospoints = [];
    const fetchMeseros = async () => {
      try {
        const meseros = await readMeseros(signal);
        if (!meseros) {
          return;
        }
        setMeseros(meseros);
        meseros.forEach((mesero) => {
          let count = 0;
          let pro = 0;
          if (newPuntuaciones[mesero.id] !== undefined) {
            count = newPuntuaciones[mesero.id].total_clientes;
            const total = propiedades
              .map((prop) => Number(newPuntuaciones[mesero.id][prop]))
              .reduce((acc, val) => acc + val, 0);

            pro = (total / propiedades.length).toFixed(2);
          }
          newmeserospoints.push({
            id: mesero.id,
            nombres: mesero.nombres,
            apellidos: mesero.apellidos,
            countClient: count,
            promedio: pro,
          });
        });

        setMeserospoints(newmeserospoints);
        console.log(newmeserospoints);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching meseros:", error);
        }
      }
    };
    const fetchPuntuaciones = async () => {
      try {
        const puntuaciones = await readPuntuaciones(signal);
        if (!puntuaciones) {
          return;
        }
        puntuaciones.forEach((element) => {
          newPuntuaciones[element.id_mesero] = element;
        });

        setPuntuaciones(newPuntuaciones);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching puntuaciones:", error);
        }
      }
    };
    fetchPuntuaciones();
    fetchMeseros();

    return () => {
      controller.abort();
    };
  }, []);

  const handleToggle = (id, nombres, apellidos) => {
    const newListRecept = { ...listRecept };
    if (newListRecept[id]) {
      delete newListRecept[id];
    } else {
      newListRecept[id] = [nombres, apellidos, id];
    }
    setListRecept(newListRecept);
  };
  const [listPuntuaciones, setListPuntuaciones] = useState<{
    [key: number]: any;
  }>({});
  useEffect(() => {
    const newListPuntuaciones: { [key: number]: unknown } = {};
    Object.keys(listRecept).forEach((id_mesero) => {
      const meseroId = Number(id_mesero);
      if (allPuntuaciones[id_mesero]) {
        newListPuntuaciones[meseroId] = {
          nombres: listRecept[meseroId][0],
          apellidos: listRecept[meseroId][1],
          ...allPuntuaciones[id_mesero],
        };
      } else {
        newListPuntuaciones[meseroId] = {
          nombres: listRecept[meseroId][0],
          apellidos: listRecept[meseroId][1],
          avg_amabilidad: 0,
          avg_presentacion: 0,
          avg_eficiencia: 0,
          avg_conocimiento_menu: 0,
          avg_tiempo_espera: 0,
        };
      }
    });
    setListPuntuaciones(newListPuntuaciones);
  }, [listRecept]);

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-center ">
      <div className="min-w-[400px] overflow-auto pr-2 max-h-[80vh]">
        <div>
          <CheckBox users={meserospoints} handleToggle={handleToggle} />
        </div>
      </div>
      <div className="flex-grow">
        <GraphRadial listRecept={listPuntuaciones} />
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { CheckBox } from "@/components/Recepcionistas/check-box";
import { readMeseros, readMesero } from "@/services/restaurant/meseroService";
import { createPuntuacion } from "@/services/restaurant/puntuacionesService";
import { createCliente } from "@/services/restaurant/clienteService";
import "./user.css";
import { set } from "react-hook-form";
export default function User() {
  const rasgos = [
    "Amabilidad",
    "Eficiencia",
    "Presentación",
    "Conocimiento del Menú",
    "Tiempo de espera",
  ];
  const [ratings, setRatings] = useState(Array(rasgos.length).fill(0));
  const [recept, setRecept] = useState([]);

  const [error, setError] = useState("");
  const [getMeseros, setMeseros] = useState([]);
  const [getMesero, setMesero] = useState([]);
  const [updatedPuntuaciones, setUpdatedPuntuaciones] = useState([]);
  const StarIcon = ({ filled }) => (
    <svg
      id="i-star"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width="100%"
      height="100%"
      fill={filled ? "#FFEB3B" : "none"}
      opacity={filled ? 1 : 0.5}
      stroke="currentcolor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1"
      preserveAspectRatio="xMidYMid meet"
    >
      <path d="M16 2 L20 12 30 12 22 19 25 30 16 23 7 30 10 19 2 12 12 12 Z" />
    </svg>
  );

  const StarIcons = ({ rating, onRate }) => {
    const stars = Array.from({ length: 10 }, (_, index) => (
      <span key={index} onClick={() => onRate(index + 1)}>
        <StarIcon filled={index < rating} />
      </span>
    ));
    return <div className="flex">{stars}</div>;
  };

  const handleRating = (index, rating) => {
    const newRatings = [...ratings];
    newRatings[index] = rating;
    setRatings(newRatings);
  };
  const handleSubmit = () => {
    const allRated = ratings.every((rating) => rating > 0);
    if (allRated) {
      setError("");
      setUpdatedPuntuaciones(ratings);
    } else {
      setError("Por favor, califica todos los rasgos.");
    }
  };

  useEffect(() => {
    if (updatedPuntuaciones.length > 0) {
      const controller = new AbortController();
      const { signal } = controller;
      const updatePuntuaciones = async () => {
        try {
          const clienteId = await createCliente(signal);
          const data = {
            id_mesero: `${recept[0]}`,
            id_cliente: `${clienteId}`,
            amabilidad: `${updatedPuntuaciones[0] }`,
            eficiencia: `${updatedPuntuaciones[1]}`,
            presentacion: `${updatedPuntuaciones[2]}`,
            conocimiento_menu: `${updatedPuntuaciones[3]}`,
            tiempo_espera: `${updatedPuntuaciones[4]}`,
          };

          await createPuntuacion(data, signal);
          setRatings(Array(rasgos.length).fill(0));
          setRecept([]);
          setUpdatedPuntuaciones([]);
        } catch (error) {
          if (error.name !== "AbortError") {
            console.error("Error al actualizar puntuaciones:", error);
          }
        }
      };
      updatePuntuaciones();
      return () => {
        controller.abort();
      };
    }
  }, [updatedPuntuaciones]);
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const fetchMeseros = async () => {
      try {
        const meseros = await readMeseros(signal);
        setMeseros(meseros);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching meseros:", error);
        }
      }
    };
    fetchMeseros();
    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (recept.length > 0) {
      const controller = new AbortController();
      const { signal } = controller;
      const fetchMesero = async () => {
        try {
          const mesero = await readMesero(recept[0], signal);
          setMesero([mesero]);
        } catch (error) {
          if (error.name !== "AbortError") {
            console.error("Error fetching mesero:", error);
          }
        }
      };
      fetchMesero();
      return () => {
        controller.abort();
      };
    }
  }, [recept]);

  const handleToggle = (id, nombres, apellidos) => {
    setRecept([id, nombres, apellidos]);
  };
  return (
    <div className="container flex flex-col max-w-screen-md ">
      <h1 className="text-3xl flex justify-center items-ceter">
        Califica el Mesero
      </h1>

      {recept.length > 0 ? (
        <div className="star">
          <div className="bg-gray-800">
            <CheckBox users={getMesero} handleToggle={() => {}} />
          </div>
          <div className="bg-slate-700 flex items-center flex-col">
            {rasgos.map((rasgo, index) => (
              <div key={rasgo}>
                <h2 className="text-xl p-4">{rasgo}</h2>
                <StarIcons
                  rating={ratings[index]}
                  onRate={(rating) => handleRating(index, rating)}
                />
              </div>
            ))}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div>
              <button className="botonstar" onClick={handleSubmit}>
                Enviar Calificación
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="items-center">
          <h2 className="py-4 text-xl">Selecciona el mesero:</h2>
          <CheckBox users={getMeseros} handleToggle={handleToggle} />
        </div>
      )}
    </div>
  );
}

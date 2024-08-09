import {
  readMeseros,
  deleteMesero,
} from "../../services/restaurant/meseroService.js";
import { CreateMesero } from "./createMesero.tsx";
import { EditMesero } from "./editMesero.js";
import { useState, useEffect } from "react";
//Muestra una tabla de todos los meseros registrados
export function ShowMesero() {
  const modalEdit = document.getElementById("modal");
  const [meseros, setMeseros] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [currentMesero, setCurrentMesero] = useState(null);
  const [idDelete, setIdDelete] = useState(null);

  useEffect(() => {
    console.log("useEffect");
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
    if (!(isEditing || isCreating)) {
      fetchMeseros();
    }
    return () => {
      controller.abort();
    };
  }, [isEditing, isCreating, idDelete]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const deleteMeseroById = async () => {
      try {
        await deleteMesero(idDelete, signal);
        setIdDelete(null);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Request canceled", error.message);
        } else {
          console.error("Error al eliminar mesero:", error);
        }
      }
    };
    if (idDelete) {
      deleteMeseroById();
    }
    return () => {
      controller.abort();
    };
  }, [idDelete]);

  const handleEditClick = (mesero) => {
    setCurrentMesero(mesero);
    setIsEditing(true);
    modalEdit?.showModal();
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentMesero(null);
    setIsCreating(false);
    modalEdit?.close();
  };

  const handleNewMesero = () => {
    setIsCreating(true);
    modal?.showModal();
  };
  const hanldleClickDelete = (id) => {
    setIdDelete(id);
  };

  return (
    <>
      <div className="container mx-auto ">
        <div className=" flex py-5">
          <h2 className="text-xl  font-semibold text-gray-900 dark:text-white">
            Meseros Registrados
          </h2>
          <button
            onClick={() => handleNewMesero()}
            className="group flex justify-center items-center ml-auto mr-0  bg-green-500 text-white font-bold py-2 px-4 rounded-xl hover:bg-green-700 mx-2"
          >
            <svg
              id="i-add"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              width="32"
              height="32"
              fill="none"
              stroke="currentcolor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="group-hover:stroke-green-200"
            >
              <path d="M16 2 L16 30 M2 16 L30 16" />
            </svg>
            <h2 className="mx-4">Agregar Mesero</h2>
          </button>
        </div>
        <div className="relative overflow-auto max-h-[75vh] shadow-md sm:rounded-lg ">
          <table className="w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-400">
            <thead className="text-l uppercase bg-gray-300 dark:bg-gray-600 dark:text-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nombres
                </th>
                <th scope="col" className="px-6 py-3">
                  Apellidos
                </th>
                <th scope="col" className="px-6 py-3">
                  DNI
                </th>
                <th scope="col" className="px-6 py-3">
                  Accion
                </th>
              </tr>
            </thead>
            <tbody>
              {meseros === undefined ? (
                <tr>
                  <td colSpan={4} className="text-center">
                    No hay meseros registrados
                  </td>
                </tr>
              ) : (
                meseros.map((mesero) => (
                  <tr
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    key={mesero.id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {mesero.nombres}
                    </th>
                    <td className="px-6 py-4">{mesero.apellidos}</td>
                    <td className="px-6 py-4">{mesero.DNI}</td>
                    <td className="flex items-center px-6 py-4">
                      <button
                        onClick={() => handleEditClick(mesero)}
                        className="group bg-blue-500 text-white font-bold py-2 px-4 rounded-xl hover:bg-blue-700"
                      >
                        <svg
                          id="i-compose"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 32 32"
                          width="32"
                          height="32"
                          fill="none"
                          stroke="currentcolor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="group-hover:stroke-blue-200"
                        >
                          <path d="M30 7 L25 2 5 22 3 29 10 27 Z M21 6 L26 11 Z M5 22 L10 27 Z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => hanldleClickDelete(mesero.id)}
                        className="group bg-red-500 text-white font-bold py-2 px-4 rounded-xl hover:bg-red-700"
                      >
                        <svg
                          id="i-trash"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 32 32"
                          width="32"
                          height="32"
                          fill="none"
                          stroke="currentcolor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="group-hover:stroke-red-200"
                        >
                          <path d="M28 6 L6 6 8 30 24 30 26 6 4 6 M16 12 L16 24 M21 12 L20 24 M11 12 L12 24 M12 6 L13 2 19 2 20 6" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <dialog id="modal">
        <div className="flex tex bg-slate-300 p-1">
          <h3 className="text-3xl pl-4 font-semibold text-black">
            {isEditing ? "Actualizar Personal" : "Agregar Personal"}
          </h3>
          <button
            className="text-white ml-auto bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 p-2"
            type="submit"
            onClick={handleCancelEdit}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div>
          {isEditing && (
            <EditMesero
              id={currentMesero.id}
              nombres={currentMesero.nombres}
              apellidos={currentMesero.apellidos}
              DNI={currentMesero.DNI}
              onCancel={handleCancelEdit}
            />
          )}
          {isCreating && <CreateMesero onCancel={handleCancelEdit} />}
        </div>
      </dialog>
    </>
  );
}

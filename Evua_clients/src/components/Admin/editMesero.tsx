import { useForm } from "react-hook-form";
import "./formulario.css";
import { updateMesero } from "../../services/restaurant/meseroService.js";
import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";

export function EditMesero({ id, nombres, apellidos, DNI, onCancel }) {
  const [success, setSuccess] = useState(false);
  const [errorModal, setErrorModal] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: unknown) => {
    const dialog = document.getElementById("modalFormEdit");
    function handleOpenDialog() {
      dialog?.showModal();
    }
    function handleCloseDialog() {
      dialog?.close();
    }
    const controller = new AbortController();
    const { signal } = controller;
    let newErrorModal = null;
    try {
      await updateMesero(id, data, signal);
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
      newErrorModal = error.response?.data?.message || error.message;
    }
    setErrorModal(newErrorModal);
    handleOpenDialog();
  };

  return (
    <>
      <dialog id="modalFormEdit">
        <form
          method="dialog"
          className={success ? "ModalDialog " : "ModalDialog bg-red-500"}
        >
          <h3>{success ? "Personal Agregado" : "Error"}</h3>
          {errorModal && <span>Error: {errorModal}</span>}
          <div>
            <button type="submit" onClick={onCancel}>
              Close
            </button>
          </div>
        </form>
      </dialog>
      <div className="Formulario">
        <h1>Ingrese Datos de los Meseros</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h2>Nombres: </h2>
            <input
              type="text"
              placeholder={nombres}
              defaultValue={nombres}
              {...register("nombres", {
                required: "Es requerido",
                maxLength: {
                  value: 50,
                  message: "Excede el límite de caracteres.",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="nombres"
              render={({ message }) => <p>{message}</p>}
            />
          </div>
          <div>
            <h2>Apellidos: </h2>
            <input
              type="text"
              placeholder={apellidos}
              defaultValue={apellidos}
              {...register("apellidos", {
                required: "Es requerido",
                maxLength: {
                  value: 50,
                  message: "Excede el límite de caracteres.",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="apellidos"
              render={({ message }) => <p>{message}</p>}
            />
          </div>
          <div>
            <h2>DNI: </h2>
            <input
              type="text"
              placeholder={DNI}
              defaultValue={DNI}
              {...register("DNI", {
                required: "Es requerido.",

                maxLength: {
                  value: 8,
                  message: "El DNI no puede tener más de 8 caracteres.",
                },
                minLength: {
                  value: 8,
                  message: "El DNI debe tener 8 caracteres.",
                },
                pattern: {
                  value: /^[0-9]*$/i,
                  message: "El DNI es solo números.",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="DNI"
              render={({ message }) => <p>{message}</p>}
            />
          </div>
          <input type="submit" />
        </form>
      </div>
    </>
  );
}

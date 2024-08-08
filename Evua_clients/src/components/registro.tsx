import { useForm } from "react-hook-form";
import { useState } from "react";
import "./formulario.css";
import {createMesero } from "./Restaurant/Meseros/ListMeseros.js";

export function Registro() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: unknown) => {
    try {
      createMesero(data);
      handleOpenDialog();
    } catch (error) {
      console.error("Error al crear mesero:", error);
    }
    
  
  }

 console.log(errors);
 const dialog = document.querySelector("dialog");

  function handleOpenDialog() {
    dialog?.showModal();
  }
  function handleCloseDialog() {
    dialog?.close();
  }
  const renderError = (field: string) => {
    if (errors[field]) {
      if (errors[field].type === "required") {
        return <span>Error: {field} es requerido</span>;
      }
      else if (errors[field].type === "maxLength") {
        return <span>Error: {field} no puede tener más caracteres</span>;
      }
      else if (errors[field].type === "min") {
        return <span>Error: {field} debe tener 8 caracteres</span>;
      }
    }
    return null;
  };
   

  return (
    <>
      <dialog>
        <form method="dialog" className="ModalDialog">
          <h3>Personal Agregado</h3>
          <div>
            <button type="submit" onSubmit={handleCloseDialog}>
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
              placeholder="Nombre"
              {...register("nombres", { required: true, maxLength: 80 })}
            />
            {renderError("nombres")}
          </div>
          <div>
            <h2>Apellidos: </h2>
            <input
              type="text"
              placeholder="Apellido"
              {...register("apellidos", { required: true, maxLength: 100 })}
            />
            {renderError("apellidos")}{" "}
          </div>
          <div>
            <h2>DNI: </h2>
            <input
              type="text"
              placeholder="DNI"
              {...register("DNI", { required: true, min: 8, maxLength: 8 })}
            />
            {renderError("DNI")}
          </div>
          <input type="submit" />
        </form>
      </div>
    </>
  );
}

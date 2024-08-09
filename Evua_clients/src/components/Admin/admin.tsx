import { ModeToggle } from "./mode-toggle";
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import { Estadistica } from "./stadistics";
import { RegistrosMeseros } from "./registrosMeseros";
function AdminApp() {
  return (
    <>
        
          <nav className="bg-slate-400">
            <ul>
              <li>
                <NavLink
                  to="Registro"
                  className={({ isActive }) =>
                    isActive ? " bg-background" : ""
                  }
                >
                  Registro de Meseros
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="Estadisticas"
                  className={({ isActive }) =>
                    isActive ? "bg-background" : ""
                  }
                >
                  Estadisticas
                </NavLink>
              </li>
            </ul>
            <ModeToggle />
          </nav>
          <Routes>
            <Route path="Estadisticas" element={<Estadistica />} />
            <Route path="Registro" element={<RegistrosMeseros />} />
          </Routes>
       
    </>
  );
}

export default AdminApp;

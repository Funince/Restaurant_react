import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import { Estadistica } from "./components/stadistics";
import { Registro } from "./components/registro";
import "./App.css";
function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <nav className="bg-slate-400">
            <ul>
              <li>
                <NavLink
                  to="/Registro"
                  className={({ isActive }) =>
                    isActive ? " bg-background" : ""
                  }
                >
                  Registro de Meseros
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Estadisticas"
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
            <Route path="/Estadisticas" element={<Estadistica />} />
            <Route path="/Registro" element={<Registro />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;

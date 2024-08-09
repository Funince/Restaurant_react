import { ThemeProvider } from "./components/Admin/theme-provider";
import { Routes, Route,BrowserRouter } from "react-router-dom";
import User from "./components/User/user.tsx";
import AdminApp from "./components/Admin/admin";
import "./App.css";
function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<User />} />
            <Route path="/admin/*" element={<AdminApp />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;

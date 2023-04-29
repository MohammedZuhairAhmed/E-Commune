import { createRoot } from "react-dom/client";
// import App from "./App";
import MapForm from "./components/MapForm";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/*" element={<MapForm />} />
    </Routes>
  </BrowserRouter>
);

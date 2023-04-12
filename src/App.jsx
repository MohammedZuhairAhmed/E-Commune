import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Org from "./components/Org";
import Commuter from "./components/Commuter";
import Org_Login from "./components/Org_Login";
import Org_Register from "./components/Org_Register";
import Commuter_Register from "./components/Commuter_Register";
import Commuter_Login from "./components/Commuter_Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/organization" element={<Org />} />
        <Route path="/organization/auth/register" element={<Org_Register />} />
        <Route path="/organization/auth/login" element={<Org_Login />} />
        <Route path="/commuter" element={<Commuter />} />
        <Route path="/commuter/auth/login" element={<Commuter_Login />} />
        <Route path="/commuter/auth/register" element={<Commuter_Register />} />
      </Route>
    </Routes>
  );
}
export default App;

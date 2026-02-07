import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./login";
import Home from "./home/home";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

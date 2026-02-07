import { BrowserRouter, Routes, Route } from "react-router-dom";

import Auth from "./auth";
import Home from "./home/home";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

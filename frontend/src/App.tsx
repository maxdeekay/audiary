import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Auth from "./auth";
import Home from "./home";
import Shelf from "./shelf";
import Challenges from "./challenges";
import Profile from "./profile";
import ProtectedRoute from "./components/protected-route";
import Layout from "./components/layout";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/shelf" element={<Shelf />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

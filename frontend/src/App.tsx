import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Auth from "./auth";
import Home from "./home";
import Collections from "./collections";
import CollectionDetail from "./collections/collection-detail";
import AlbumDetail from "./collections/album-detail";
import Search from "./search";
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
          <Route path="/search" element={<Search />} />
          <Route path="/collections" element={<Collections />} />
          <Route
            path="/collections/:collectionId"
            element={<CollectionDetail />}
          />
          <Route
            path="/collections/:collectionId/albums/:albumId"
            element={<AlbumDetail />}
          />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

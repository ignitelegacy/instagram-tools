import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Boutique from "./pages/Boutique.jsx";
import PinnedPosts from "./pages/PinnedPosts.jsx";
import BioGenerator from "./pages/BioGenerator.jsx";
import StoriesStudio from "./pages/StoriesStudio.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boutique" element={<Boutique />} />
        <Route path="/pinned-posts" element={<PinnedPosts />} />
        <Route path="/bio-generator" element={<BioGenerator />} />
        <Route path="/stories-studio" element={<StoriesStudio />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

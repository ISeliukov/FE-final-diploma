import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Plain } from "./engine/plain";
import HomePage from "./pages/home";
import SelectionTrain from "./pages/trainselection";
import NotFound from "./pages/notfound";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Plain />}>
          <Route index element={<HomePage />} />
          <Route path="trains/" element={<SelectionTrain />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      
      </Routes>
    </BrowserRouter>
  );
}

export { App };

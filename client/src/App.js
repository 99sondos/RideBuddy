import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateTrip from "./components/CreateTrip";
import Trips from "./components/Trips";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Welcome to RideBuddy!</h1>} />
        <Route path="/create-trip" element={<CreateTrip />} />
        <Route path="/trips" element={<Trips />} />
      </Routes>
    </Router>
  );
}

export default App;

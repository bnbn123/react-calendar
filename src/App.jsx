import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { EventProvider } from "./contexts/EventContext";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <EventProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </EventProvider>
  );
};

export default App;

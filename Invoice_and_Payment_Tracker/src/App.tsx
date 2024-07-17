import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InvoicePage from './pages/InvoicePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InvoicePage />} />
      </Routes>
    </Router>
  );
}

export default App;

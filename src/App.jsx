import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Lens from './pages/Lens';
import Archive from './pages/Archive';
import Contribute from './pages/Contribute';

function App() {
  return (
    <Router>
      <div className="bg-neutral-900 min-h-screen text-white">
        <Routes>
          <Route path="/" element={<Lens />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/contribute" element={<Contribute />} />
        </Routes>
        <Navbar />
      </div>
    </Router>
  );
}

export default App;
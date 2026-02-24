import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Association from './pages/Association';
import Projects from './pages/Projects';
import Formations from './pages/Formations';
import Partenaires from './pages/Partenaires';
import Contact from './pages/Contact';

import Gallery from './pages/Gallery';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="association" element={<Association />} />
          <Route path="galerie" element={<Gallery />} />
          <Route path="projets" element={<Projects />} />
          <Route path="formations" element={<Formations />} />
          <Route path="partenaires" element={<Partenaires />} />
          <Route path="contact" element={<Contact />} />

          {/* Legacy Redirects from Squarespace/Google indexing */}
          <Route path="a-propos" element={<Navigate to="/association" replace />} />
          <Route path="nos-projets" element={<Navigate to="/projets" replace />} />
          <Route path="nos-formations" element={<Navigate to="/formations" replace />} />
          <Route path="nos-partenaires" element={<Navigate to="/partenaires" replace />} />

          <Route path="*" element={
            <div className="py-24 px-4 text-center min-h-[60vh] flex flex-col items-center justify-center">
              <h1 className="text-6xl font-black text-primary mb-4">404</h1>
              <p className="text-xl text-gray-600 mb-8">Oups ! Cette page n'existe pas ou a été déplacée.</p>
              <Navigate to="/" />
            </div>
          } />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

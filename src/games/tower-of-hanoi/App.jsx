import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Game from './Game';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="game" element={<Game />} />
    </Routes>
  );
};

export default App;

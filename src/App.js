import React, { useState } from 'react';
import './App.css';
import AppRoutes from './AppRoutes';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <AppRoutes />
    </Router> 
  );
}

export default App;

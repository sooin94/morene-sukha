import React, { useState } from 'react';
import './App.css';
import AppRoutes from './AppRoutes';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar  from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar/>
      <AppRoutes />
    </Router> 
  );
}

export default App;

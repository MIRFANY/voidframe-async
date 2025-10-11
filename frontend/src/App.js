import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './components/Dashboard';
<<<<<<< HEAD
import DPRAnalyzer from './components/DPRAnalyzer';

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>DPR Evaluator Dashboard</h1>
      <Dashboard />
      <DPRAnalyzer />
    </div>
=======
import './styles.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
>>>>>>> 3564635512c00925752e81e887232cc00ccad7c4
  );
}

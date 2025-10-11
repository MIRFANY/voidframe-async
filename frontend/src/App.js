import React from 'react';
import Dashboard from './components/Dashboard';
import DPRAnalyzer from './components/DPRAnalyzer';

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>DPR Evaluator Dashboard</h1>
      <Dashboard />
      <DPRAnalyzer />
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

// Dashboard shows a list of DPRs and their scores; this is a minimal demo UI
export default function Dashboard() {
  const [dprs, setDprs] = useState([]);

  useEffect(() => {
    // Fetch sample data from backend health endpoint for demo
    axios.get('/api/health')
      .then(res => console.log('backend health:', res.data))
      .catch(err => console.error(err));

    // Demo: mock DPRs
    setDprs([
      { id: '1', filename: 'dpr-july.pdf', score: 0.78, risk: 'Low' },
      { id: '2', filename: 'dpr-aug.pdf', score: 0.45, risk: 'Medium' },
      { id: '3', filename: 'dpr-sep.pdf', score: 0.92, risk: 'High' }
    ]);
  }, []);

  return (
    <div>
      <h2>Recent DPRs</h2>
      <ul>
        {dprs.map(d => (
          <li key={d.id}>
            <strong>{d.filename}</strong> — Quality: {(d.score*100).toFixed(0)}% — Risk: {d.risk}
          </li>
        ))}
      </ul>

      <h3>Quality Distribution</h3>
      <BarChart width={500} height={300} data={dprs}>
        <XAxis dataKey="filename" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="score" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

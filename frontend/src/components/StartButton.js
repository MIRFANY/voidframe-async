import React from 'react';

export default function StartButton({ onClick }) {
  return (
    <button onClick={onClick} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full text-lg shadow">Start Assessment</button>
  );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';

export default function Home() {
  const navigate = useNavigate();
  function handleStart() { 
    navigate('/dashboard');
  }
  return (
    <div>
      <Navbar />
      <HeroSection onStart={handleStart} />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold">What this platform does</h2>
        <p className="mt-2 text-gray-600">This demo prototype extracts text from DPR PDFs, runs NLP checks and a risk predictor, and highlights gaps for decision-makers.</p>
      </main>
    </div>
  );
}

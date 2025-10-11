import React from 'react';
import StartButton from './StartButton';

// HeroSection: landing hero with main heading in Bangla and CTA
export default function HeroSection({ onStart }) {
  return (
    <section className="bg-gradient-to-r from-white to-gray-50 py-16">
      <div className="max-w-5xl mx-auto px-4 text-center">
  <h1 className="text-3xl sm:text-4xl font-extrabold">DPR Assessment — Made Simple</h1>
  <p className="mt-4 text-gray-700">AI-powered project evaluation supporting all Northeast Indian languages and communities</p>

        <div className="mt-8">
          <StartButton onClick={onStart} />
        </div>
      </div>
    </section>
  );
}

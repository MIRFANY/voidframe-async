import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';

// Top navigation bar used across the site. Uses React Router `Link` for client-side navigation.
export default function Navbar() {
  const navigate = useNavigate();
  function handleLogout() {
    // Placeholder logout handler: clear session and redirect to home.
    // Integrate with auth (JWT/session) when available.
    // localStorage.removeItem('authToken');
    navigate('/');
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-6">
            <Link to="/dashboard" className="text-lg font-semibold">Add & Manage DPR</Link>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <button onClick={handleLogout} className="px-3 py-2 rounded-md text-sm bg-red-500 text-white">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

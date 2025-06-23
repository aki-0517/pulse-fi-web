import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface AccessCodePopupProps {
  onSuccess: () => void;
}

const AccessCodePopup: React.FC<AccessCodePopupProps> = ({ onSuccess }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const correctCode = import.meta.env.VITE_ACCESS_CODE;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === correctCode) {
      setError('');
      onSuccess();
    } else {
      setError('Invalid access code.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-md">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-sm relative">
        <Link to="/" className="absolute top-6 left-6 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <h2 className="text-2xl font-bold text-white text-center mb-6">Enter Access Code</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={6}
            className="w-full bg-gray-800 border-2 border-gray-700 text-white text-center text-2xl tracking-[0.5em] rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="______"
          />
          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition-colors font-medium text-lg"
          >
            ACCESS
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccessCodePopup; 
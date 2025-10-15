import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

if (process.env.NODE_ENV === 'development') {
  const originalError = console.error;
  console.error = (...args) => {
    const message = args
      .map(arg => (typeof arg === 'string' ? arg : JSON.stringify(arg)))
      .join(' ');
    if (/removeChild/.test(message)) return; 
    originalError(...args);
  };
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

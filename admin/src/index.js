import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextoProvider } from "./Context/AuthContexto";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <AuthContextoProvider>
    <App />
  </AuthContextoProvider>
</React.StrictMode>

);


reportWebVitals();

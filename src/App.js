import React, { useState } from 'react';
import './App.css';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';

function App() {
  const [currentPage, setCurrentPage] = useState('login');

  const goToLogin = () => {
    setCurrentPage('login');
  };

  const goToLanding = () => {
    setCurrentPage('landing');
  };

  return (
    <div className="container">
      {currentPage === 'landing' ? (
        <LandingPage goToLogin={goToLogin} />
      ) : (
        <LoginPage goToLanding={goToLanding} />
      )}
    </div>
  );
}

export default App;

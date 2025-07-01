import React, { useState } from 'react';
import './App.css';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';

function Welcome(props){
  return<h2>Welcome, {props.name}!</h2>;
}

function App() { 
  //const [currentPage, setCurrentPage] = useState('login');

  //const goToLogin = () => {
    //setCurrentPage('login');
  //};

  //const goToLanding = () => {
    //setCurrentPage('landing');
  //};

  return (
    //<div className="container">
      //{currentPage === 'landing' ? (
        //<LandingPage goToLogin={goToLogin} />
      //) : (
       // <LoginPage goToLanding={goToLanding} />
      //)}
    //</div>

    <div>
      <Welcome name = "Mark"/>
      <Welcome name = "Aaron"/>
      <Welcome name = "Dayrit"/>
    </div>
  );
}

export default App;

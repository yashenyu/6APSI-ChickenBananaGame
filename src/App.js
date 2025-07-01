import React, { useState } from 'react';
import './App.css';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';

function Welcome(props){
  return<h2>Welcome, {props.name}!</h2>;
}

function Counter(){
  const[count, setCount] = useState(0);

  function handleClick(){
    setCount(count+1);
  }

  return(
    <div>
      <p>
        You clicked {count} times.
      </p>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
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

    // Welcome Function

    //Counter function
    <div>
      <Welcome name = "Mark"/>
      <Welcome name = "Boyles"/>
      <Welcome name = "Dayrit"/>
      <Counter/>
    </div>
  );
}

export default App;         

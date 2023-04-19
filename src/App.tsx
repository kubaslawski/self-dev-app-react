import React from 'react';
import logo from './logo.svg';
import "./global/styles/global-styles.css"
import './App.css';
import Routing from "./routing/routing";

function App() {
  return (
    <div>
      <main>
        <Routing/>
      </main>
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;

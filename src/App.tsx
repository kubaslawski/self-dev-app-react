import React from 'react';
import "./global/styles/global-styles.css"
import './App.css';
// components
import Routing from "./routing/routing";
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
    <div>
      <main>
        <BrowserRouter>
          <Navbar/>
          <Routing/>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;

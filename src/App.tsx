import React from 'react';
import "./global/styles/global-styles.css"
import styles from "./App.module.css";
// components
import Routing from "./routing/routing";
import Navbar from "./components/Navbar/Navbar";
// router
import {BrowserRouter} from "react-router-dom";
// redux
import {Provider} from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div>
        <BrowserRouter>
          <Navbar/>
          <main className={styles.mainContainer}>
            <Routing/>
          </main>
        </BrowserRouter>
      </div>
    </Provider>

  );
}

export default App;

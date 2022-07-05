import React from 'react';
import './App.css';

import AppRouter from "./UI/AppRouter/AppRouter";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";

function App() {

  return (
    // <Provider store={''}>
    <div className="App">
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
    </div>
    // </Provider>
  );
}

export default App;

import React from 'react';
import './App.css';

import AppRouter from "./UI/AppRouter/AppRouter";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from './redux/store'

function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <AppRouter/>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;

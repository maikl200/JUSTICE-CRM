import React, {useEffect} from 'react';
import axios from 'axios'
import './App.css';

import AppRouter from "./UI/AppRouter/AppRouter";
import {BrowserRouter} from "react-router-dom";

function App() {

  useEffect(() => {
    const result = axios.get('http://localhost:4000/api/auth/register')
      .then(() => {
        console.log(result)
      })
  }, [])
  return (
    <div className="App">
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
    </div>
  );
}

export default App;

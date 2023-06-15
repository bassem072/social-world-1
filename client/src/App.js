import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from './pages/Auth/Auth';
import Home from './pages/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element= { <Auth /> } />
        <Route path='/' element= { <Home /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

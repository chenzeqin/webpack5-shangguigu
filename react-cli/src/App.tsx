import React from 'react';
import Home from './views/Home';
import { BrowserRouter, NavLink, Routes, Route, Navigate } from 'react-router-dom'
import About from './views/About';

export default function app() {
  return (
    <div>
      <BrowserRouter>
        <NavLink to="/home">首页</NavLink>
        <NavLink to="/about">关于</NavLink>
        <Routes>
          <Route path='/' element={<Navigate to="/home" replace={true}></Navigate>}></Route>
          <Route path='/home' element={<Home></Home>}></Route>
          <Route path='/about' element={<About></About>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

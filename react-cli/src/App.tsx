import React, { lazy, Suspense } from 'react';
import { BrowserRouter, NavLink, Routes, Route, Navigate } from 'react-router-dom'

const Home = lazy(() => import( /* webpackChunkName: 'Home' */ './views/Home'))
const About = lazy(() => import( /* webpackChunkName: 'About' */  './views/About'))


export default function app() {
  return (
    <div>
      <BrowserRouter>
        <NavLink to="/home">首页</NavLink>
        <NavLink to="/about">关于</NavLink>
        <Suspense>
          <Routes>
            <Route path='/' element={<Navigate to="/home" replace={true}></Navigate>}></Route>
            <Route path='/home' element={<Home></Home>}></Route>
            <Route path='/about' element={<About></About>}></Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

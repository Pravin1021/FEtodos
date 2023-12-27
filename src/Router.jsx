import React from 'react';
import Login from './Login';
import Register from './Register';
import Listitem from './Listitem';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login/>}></Route>
            <Route path='/Register' element={<Register/>}></Route>
            <Route path='/Listitem' element={<Listitem/>}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default Router
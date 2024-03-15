import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import ListProductos from './Componentes/Productos/ListProductos.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListCategoria from './Componentes/Categoria/ListCategorias.tsx';
import NavBar from './Componentes/Navbar.jsx';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {

  return (
    <>
    <NavBar></NavBar>
    <BrowserRouter>
    <Switch>
      <Route exac path='/Categoria'> 
        <ListCategoria></ListCategoria>
      </Route>
      <Route exac path='/Productos'> 
        <ListProductos></ListProductos>
      </Route>

    </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;

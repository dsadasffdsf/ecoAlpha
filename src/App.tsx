import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductsDetail from './components/Products/ProductsDetal';
import CreateProduct from 'pages/CreateProduct';
import ProductEdit from 'pages/EditProduct';

const App: FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/products/:id" element={<ProductsDetail />}></Route>
        <Route path="/createProduct" element={<CreateProduct />}></Route>
        <Route path="/productEdit/:id" element={<ProductEdit />}></Route>
      </Route>
    </Routes>
  );
};

export default App;

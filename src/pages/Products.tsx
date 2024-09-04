import Product from 'components/Products/Product';
import { useAppDispatch, useAppSelector } from 'hook/rtkHook';
import { IProduct } from 'modules/IProduct';
import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../redux/slices/productSlice';
import ProductsList from 'components/Products/ProductsList';
import ProductsFilter from 'components/Products/ProductsFilter';
import ProductSearch from 'components/Products/ProductSearch';

const Products: FC = () => {

  return (
    <>
      <ProductsFilter />
      <ProductsList />
    </>
  );
};

export default Products;

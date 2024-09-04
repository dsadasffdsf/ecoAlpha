import Product from 'components/Products/Product';
import { useAppDispatch, useAppSelector } from 'hook/rtkHook';
import { IProduct } from 'modules/IProduct';

import React, { FC, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../../redux/slices/productSlice';
import Pagination from 'components/Pagination';
import ProductSearch from './ProductSearch';

const ProductsList: FC = () => {
  const dispatch = useAppDispatch();
  const { products, filter } = useAppSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  console.log('rerender');

  const [searchProduct, setSearchedProducts] = useState('');
  //фильтр
  const [priceStyleFilter, setPriceStyleFilter] = useState('default');
  // Формирую массив продуктов в поисковике + на экране под флаг для всего и лайкнутых
  const searchedProducts =
    filter === 'all'
      ? products.filter((product) => {
          return product.title.toLocaleLowerCase().includes(searchProduct.toLocaleLowerCase());
        })
      : products
          .filter((product) => product.like === true)
          .filter((product) => {
            return product.title.toLocaleLowerCase().includes(searchProduct.toLocaleLowerCase());
          });

  //пагинация

  const [currentPage, setCurrentPage] = useState(1);
  const productOnPage = 6;

  let filteredProducts;

  if (priceStyleFilter === 'descending') {
    filteredProducts = searchedProducts.sort((a, b) => b.price - a.price);
  } else if (priceStyleFilter === 'ascending') {
    filteredProducts = searchedProducts.sort((a, b) => a.price - b.price);
  } else {
    filteredProducts = searchedProducts;
  }

  const displayProducts = filteredProducts;

  const totalPage = Math.ceil(displayProducts.length / productOnPage);
  const firstProductOnPage = (currentPage - 1) * productOnPage;
  const lastProductOnPage = firstProductOnPage + productOnPage;

  const currentProducts = displayProducts.slice(firstProductOnPage, lastProductOnPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  //Фильтр по цене

  const createPriceFilterElem = (title: string, styleTriggerFilter: string) => {
    return (
      <li
        className={`price-filter__item ${
          priceStyleFilter === styleTriggerFilter ? 'price-filter__active' : ''
        }`}
        onClick={() => {
          setPriceStyleFilter(styleTriggerFilter);
        }}>
        {title}
      </li>
    );
  };

  return (
    <>
      <div className="flex space-x-12 items-center">
        <ProductSearch
          setSearchedProducts={setSearchedProducts}
          searchProduct={searchProduct}
          searchedProducts={searchedProducts}
        />
        <div className="flex space-x-4 ">
          <h4 className="content-center">Фильтрация по цене:</h4>
          <ul className="flex space-x-4">
            {createPriceFilterElem('По умолчанию', 'default')}
            {createPriceFilterElem('По убыванию', 'descending')}
            {createPriceFilterElem('По возрастанию', 'ascending')}
          </ul>
        </div>
      </div>

      <div className="min-h-[550px] my-4 mt-28">
        <ul className="grid grid-cols-3 gap-4  ">
          {currentProducts
            ? currentProducts.map((product: IProduct) => (
                <Product key={product.id} product={product} />
              ))
            : 'Загрузка продуктов'}
        </ul>
      </div>

      <Pagination
        totalPage={totalPage}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default ProductsList;

import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const Header: FC = () => {
  return (
    <header className="my-8">
      <ul className="flex justify-center space-x-4">
        <Link className="hover:text-gray-500" to="/">
          Home
        </Link>
        <Link className="hover:text-gray-500 " to="/products">
          Products
        </Link>
        <Link className="hover:text-gray-500 " to="/createProduct">
          CreateProduct
        </Link>
      </ul>
    </header>
  );
};

export default Header;

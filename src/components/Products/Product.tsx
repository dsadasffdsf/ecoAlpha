import { useAppDispatch } from 'hook/rtkHook';
import { IProduct } from 'modules/IProduct';
import React, { FC } from 'react';
import { remProduct, toFavorite } from '../../redux/slices/productSlice';
import { Link } from 'react-router-dom';
import ProductEdit from '../../pages/EditProduct';

const Product: FC<{ product: IProduct }> = ({ product }) => {
  const { id, title, price, description, like } = product;
  const dispatch = useAppDispatch();

  const favoriteHandler = () => {
    dispatch(toFavorite({ ...product })); 
  };

  const remHandler = () => {
    dispatch(remProduct(id));
  };
  return (
    <>
      <li className="relative">
        <Link key={product.id} to={`/products/${product.id}`} state={{ product }}>
          <div className="hover:shadow-xl p-4 space-y-2 h-64 w-full bg-gray-50 rounded-md ">
            <div className="min-h-12 line-clamp-2 mt-4">{title}</div>

            <div>{price}$</div>
            <div className=" line-clamp-2">{description}</div>

            <div className="relative"></div>
          </div>
        </Link>

        <ul className="absolute top-[10px] right-[10px] space-x-4 flex justify-end items-center">
          <li className="w-[30px]">
            <Link className="inline-block" to={`/productEdit/${product.id}`} state={{ product }}>
              <div className="w-4 h-4 text-pink-600 hover:opacity-50"> Edit</div>
            </Link>
          </li>
          <li className="w-[30px]">
            <div className="heart-container">
              <div className={`heart ${like ? 'opacity-100' : ''}`} onClick={favoriteHandler}></div>
            </div>
          </li>
          <li className="w-[30px]">
            <div className="close-cross" onClick={remHandler}></div>
          </li>
        </ul>
      </li>
    </>
  );
};

export default Product;

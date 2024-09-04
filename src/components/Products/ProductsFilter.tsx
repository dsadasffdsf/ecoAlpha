import { useAppDispatch } from 'hook/rtkHook';
import { ProductFilterType } from 'modules/IProduct';
import React, { FC, useState } from 'react';
import { setType } from '../../redux/slices/productSlice';

const ProductsFilter: FC = () => {
  const [activeBtnFilter, setActiveBtnFilter] = useState('all');

  const dispatch = useAppDispatch();

  const createFilterElem = (title: string, styleTriggerFilter: ProductFilterType) => {
    return (
      <li
        className=""
        onClick={() => {
          setActiveBtnFilter(styleTriggerFilter);
          dispatch(setType(styleTriggerFilter));
        }}>
        <h5
          className={`cursor-pointer ${
            activeBtnFilter === styleTriggerFilter ? 'font-black' : ''
          }`}>
          {title}
        </h5>
      </li>
    );
  };
  return (
    <>
      <ul className="flex justify-center my-8 space-x-4">
        {createFilterElem('Все продукты', 'all')}
        {createFilterElem('Избранные продукты', 'favorite')}
      </ul>
    </>
  );
};

export default ProductsFilter;

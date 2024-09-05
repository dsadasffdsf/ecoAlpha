import React, { FC, useEffect, useRef, useState, useCallback } from 'react';
import { IProduct } from 'modules/IProduct';

interface ProductSearchProps {
  searchProduct: string;
  searchedProducts: IProduct[];
  setSearchedProducts: (value: string) => void;
}

const ProductSearch: FC<ProductSearchProps> = ({
  searchProduct,
  searchedProducts,
  setSearchedProducts,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  // Меморизация функции обработчика изменения поиска
  const searchProductHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchedProducts(event.target.value);
    },
    [setSearchedProducts]
  );

  // Обработка клика вне поля или списка
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    },
    [inputRef, dropdownRef]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div>
      <div>
        <form className="w-[500px]">
          <input
            type="text"
            className="create-product_input"
            placeholder="Search product..."
            onChange={searchProductHandler}
            value={searchProduct}
            onClick={() => setIsOpen(true)}
            ref={inputRef}
          />
        </form>
      </div>
      <div className="relative">
        {searchProduct && isOpen && (
          <ul
            ref={dropdownRef}
            className="absolute top-0 left-0 z-[101] space-y-2 bg-slate-600 max-h-[370px] w-[500px] overflow-y-auto"
          >
            {searchedProducts.map((product) => (
              <li
                key={product.id}
                className="hover:bg-slate-200 cursor-pointer p-4"
                onClick={() => {
                  setSearchedProducts(product.title);
                  setIsOpen(false);
                }}
              >
                {product.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProductSearch;
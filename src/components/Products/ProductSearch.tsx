import { useAppSelector } from 'hook/rtkHook';
import { IProduct } from 'modules/IProduct';
import React, { FC, useEffect, useRef, useState } from 'react';

interface ProductSearch {
  searchProduct: string;
  searchedProducts: IProduct[];
  setSearchedProducts: (value: string) => void;
}

const ProductSearch: FC<ProductSearch> = ({
  searchProduct,
  searchedProducts,
  setSearchedProducts,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const searchProductHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedProducts(event.target.value);
  };
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Если клик был произведен вне элемента, на который ссылается inputRef
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsOpen(false); // Закрываем меню
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [inputRef]);

  return (
    <>
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
        <div className="relative  ">
          <ul className=" absolute top-0 left-0 z-[101] space-y-2 bg-slate-600 max-h-[370px] w-[500px] overflow-y-auto ">
            {searchProduct && isOpen
              ? searchedProducts.map((product) => (
                  <li
                    key={product.id}
                    className="hover:bg-slate-200 cursor-pointer p-4"
                    onClick={() => {
                      setSearchedProducts(product.title);
                      setIsOpen(!isOpen);
                    }}>
                    {product.title}
                  </li>
                ))
              : ''}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProductSearch;

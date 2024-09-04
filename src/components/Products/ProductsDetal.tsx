import React, { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ProductsDetal: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};
  const { price, title, id, description } = product;
  const pageBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div>
        <button onClick={pageBack}>Вернуться</button>
      </div>
      <div className="border shadow-sm flex flex-col items-center p-4">
        <p>id --- {id}</p>
        <h2>{title}</h2>
        <h4>price - {price} $</h4>
        <p>{description}</p>
      </div>
    </>
  );
};

export default ProductsDetal;

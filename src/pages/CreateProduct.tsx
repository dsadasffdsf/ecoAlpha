import { useAppDispatch, useAppSelector } from 'hook/rtkHook';

import React, { FC, useRef, useState } from 'react';
import { addProduct } from '../redux/slices/productSlice';
import { v4 as uuidv4 } from 'uuid';
import { validationError } from 'func/validationError';
import InputForForm from 'components/InputForForm';
import { IProduct } from 'modules/IProduct';

const CreateProduct: FC = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.products);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [priceError, setPriceError] = useState('');

  const generateProductHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { validateForm } = validationError({
      title,
      description,
      price,
      setTitleError,
      setDescriptionError,
      setPriceError,
      products,
    });

    if (validateForm.valDesc && validateForm.valTitle && validateForm.valPrice) {
      const product: IProduct = {
        id: uuidv4(),
        title: title,
        description: description,
        price: parseFloat(price),
        like: false,
      };

      dispatch(addProduct(product));
      alert('Продукт успешно добавлен');
    }
  };

  return (
    <>
      <h1 className="text-center">Форма создания продукта</h1>
      <form action="#" className="mt-8 p-4" onSubmit={generateProductHandler}>
        <ul className="space-y-4">
          <InputForForm
            title={'title'}
            placeholder={'Введите заголовок'}
            error={titleError}
            onChange={(e) => setTitle(e.target.value)}
          />
          <InputForForm
            title={'description'}
            placeholder={'Введите описание'}
            error={descriptionError}
            onChange={(e) => setDescription(e.target.value)}
          />
          <InputForForm
            title={'price'}
            placeholder={'Введите цену'}
            error={priceError}
            onChange={(e) => setPrice(e.target.value)}
          />
        </ul>
        <div className="mt-4">
          <button type="submit" className="btn float-right">
            Создать продукт
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateProduct;

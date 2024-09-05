import InputForForm from 'components/InputForForm';
import { validationError } from 'func/validationError';
import { useAppDispatch, useAppSelector } from 'hook/rtkHook';
import { IProduct } from 'modules/IProduct';
import React, { FC, useCallback, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { editProduct } from '../redux/slices/productSlice';

interface LocationState {
  product: IProduct;
}

const EditProduct: FC = () => {
  const location = useLocation();
  const { product } = location.state as LocationState;
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.products);

  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price.toString());

  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [priceError, setPriceError] = useState('');

  const changeProductHandler = (event: React.FormEvent) => {
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
      const changedProduct: IProduct = {
        id: product.id,
        title,
        description,
        price: parseFloat(price),
        like: product.like,
      };
      dispatch(editProduct(changedProduct));
      alert('Продукт успешно изменен');
    }
  };

  const titleHandler = useCallback((titleValue: string) => {
    setTitle(titleValue);
  }, []);
  const descriptionHandler = useCallback((descriptionValue: string) => {
    setDescription(descriptionValue);
  }, []);
  const priceHandler = useCallback((priceValue: string) => {
    setPrice(priceValue);
  }, []);

  return (
    <>
      <form
        action="#"
        className="shadow-lg flex flex-col space-y-4"
        onSubmit={changeProductHandler}>
        <ul>
          <InputForForm
            title="title"
            placeholder="Введите заголовок"
            error={titleError}
            value={title}
            onChange={titleHandler}
          />
          <InputForForm
            title="description"
            placeholder="Введите описание"
            error={descriptionError}
            value={description}
            onChange={descriptionHandler}
          />
          <InputForForm
            title="price"
            placeholder="Введите цену"
            error={priceError}
            value={price}
            onChange={priceHandler}
          />
        </ul>
        <button type="submit" className="btn">
          Изменить продукт
        </button>
      </form>
    </>
  );
};

export default EditProduct;

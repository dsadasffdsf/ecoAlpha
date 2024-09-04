import { useState } from 'react';
import { useAppSelector } from '../hook/rtkHook';
import { IProduct } from 'modules/IProduct';

export interface ValidationError {
  title: string;
  description: string;
  price: string;
  setTitleError: React.Dispatch<React.SetStateAction<string>>;
  setDescriptionError: React.Dispatch<React.SetStateAction<string>>;
  setPriceError: React.Dispatch<React.SetStateAction<string>>;
  products: IProduct [];
}

export const validationError = ({
  title,
  description,
  price,
  setTitleError,
  setDescriptionError,
  setPriceError,
  products,
}: ValidationError) => {
  let validateForm = { valTitle: true, valDesc: true, valPrice: true };

  const titleRegex = /^.{5,}$/;
  const descRegex = /^.{15,}$/;
  const priceRegex = /^\d+(\.\d+)?$/;

  const rep = products.some((product) => product.title === title);

  if (!title) {
    validateForm.valTitle = false;
    setTitleError('Поле title не должно быть пустым!');
  } else if (!titleRegex.test(title)) {
    validateForm.valTitle = false;
    setTitleError('Поле title должно содержать минимум 5 символов !');
  } else if (rep) {
    validateForm.valTitle = false;
    setTitleError('Такой продукт уже существует');
  } else {
    validateForm.valTitle = true;
    setTitleError('');
  }

  if (!description) {
    validateForm.valDesc = false;
    setDescriptionError('Поле description не должно быть пустым!');
  } else if (!descRegex.test(description)) {
    validateForm.valDesc = false;
    setDescriptionError('Поле description должно содержать от 10 символов !');
  } else {
    validateForm.valDesc = true;
    setDescriptionError('');
  }

  if (!price) {
    validateForm.valPrice = false;
    setPriceError('Поле price не должно быть пустым!');
  } else if (!priceRegex.test(price)) {
    validateForm.valPrice = false;
    setPriceError('Поле price должно содержать только цифры !(десятичные отделяются точкой )');
  } else {
    validateForm.valPrice = true;
    setPriceError('');
  }
  return { validateForm };
};

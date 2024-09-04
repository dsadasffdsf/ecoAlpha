import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { find } from '@reduxjs/toolkit/dist/utils';
import axios from 'axios';
import Product from 'components/Products/Product';
import { InintialProducts, IProduct, ProductFilterType } from 'modules/IProduct';

export const fetchProducts = createAsyncThunk<IProduct[], void>(
  'products/fetchProducts',
  async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      return response.data;
    } catch (error) {
      console.log('Ошибка', error);
    }
  },
);

const initialState: InintialProducts = {
  products: [],
  filter: 'all',
};

export const productSlice = createSlice({
  name: 'ProductsSlice',
  initialState,
  reducers: {
    remProduct: (state, action: { payload: string }) => {
      const id = action.payload;
      state.products = state.products.filter((product) => product.id !== id);
      // state.favoriteProducts = state.favoriteProducts.filter((product) => product.id !== id);
    },
    toFavorite: (state, action: { payload: IProduct }) => {
      const selectedProduct = action.payload;

      state.products = state.products.map((product) => {
        if (product.id === selectedProduct.id) {
          return { ...product, like:!selectedProduct.like };
        }
        return product;
      });
    },
    setType: (state, action: { payload: ProductFilterType }) => {
      state.filter = action.payload;
    },
    addProduct: (state, action: { payload: IProduct }) => {
      state.products.push({ ...action.payload, like: false });
    },
    editProduct: (state, action: { payload: IProduct }) => {
      state.products = state.products.map((product) => {
        if (product.id === action.payload.id) {
          return { ...action.payload };
        }
        return product;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      //чтобы корректно отображались кастомные продукты
      const mainPropertiesForProducts = action.payload.map((product) => {
        const { id, title, description, price } = product;
        return { id, title, description, price };
      });

      const productSet = new Set(state.products.map((product) => product.id));

      mainPropertiesForProducts.map((product) => {
        if (!productSet.has(product.id)) {
          state.products.push({ ...product, like: false });
        }
      });
    });
  },
});

// Action creators are generated for each case reducer function
export const { remProduct, toFavorite, setType, addProduct, editProduct } = productSlice.actions;

export default productSlice.reducer;

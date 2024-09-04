export interface IProduct {
  id: string;
  title: string;
  price: number;
  description: string;
  like: boolean;
}
export type ProductFilterType = 'all' | 'favorite';

export interface InintialProducts {
  products: IProduct[];
  filter: ProductFilterType;
}

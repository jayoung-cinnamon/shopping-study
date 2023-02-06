//product type
export interface IProduct {
  ulid: string;
  id: number;
  productName: string;
  price: number;
  like: number;
  categoryId: number;
  categoryName: string;
  brandName: string;
  img: string;
}

//category type
export interface ICategoryProps {
  title: string;
  all: boolean;
  ring: boolean;
  bracelet: boolean;
  necklace: boolean;
  earing: boolean;
  selected: object;
}

// Update type
export interface IUpdateProduct {
  productName: string;
  price: number;
  categoryId: number;
  categoryName: string;
}

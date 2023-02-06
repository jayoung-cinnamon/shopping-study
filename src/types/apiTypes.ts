import { IProduct } from "./productTypes";

// get Request
export interface IGetRequest {
  id: number;
  productName: string;
  price: number;
  like: number;
}

//get Response
export interface IGetResponse {
  data: IProduct[];
}

//delete Request
export interface IDeleteRequest {
  id: number;
}

//delete Response
export interface IDeleteResponse {
  status: string;
  data: {};
}

//post Request
export interface IPostRequest {
  id: number;
  productName: string;
  price: number;
}

//post Response
export interface IPostResponse {
  data: IProduct;
}

//update Request
export interface IUpdateRequest {
  data: {
    productName: string;
    price: number;
  };
}

//update Response
export interface IUpdateResponse {
  data: IProduct;
}

//get main carousel
export interface IMainCarouselResponse {
  imgData: JSX.Element[];
}

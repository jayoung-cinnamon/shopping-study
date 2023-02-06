import { IBestSellerId } from "./../types/mainTypes";
import axios from "axios";
import { IProduct } from "../types/productTypes";
import {
  IGetRequest,
  IGetResponse,
  IDeleteRequest,
  IPostRequest,
} from "../types/apiTypes";
import { IMainCarousel } from "../types/mainTypes";
const $axios = axios.create({
  headers: { "Cache-Control": "no-cache" },
  baseURL: "http://localhost:5000",
  timeout: 1000,
  withCredentials: true,
});

//getAll API
export const getProductAPI = async () => {
  const response = await $axios.get<IProduct[]>("/product");
  return response.data;
};

export const getServerSideProps = async (context: any) => {
  try {
    const postDetail = await axios
      .get(`.../post/${context.query.id}`)
      .then((res) => res.data)
      .catch((err) => console.log("err:", err));

    return {
      props: { postDetail },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {},
    };
  }
};

//get one product API
export const getSingleProductAPI = async (id: number) => {
  const response = await $axios.get<IProduct>(`/product/${id}`);
  return response.data;
};
//delete API
export const deleteProductAPI = async (id: number) => {
  const response = await $axios.delete<IDeleteRequest>(`/product/${id}`);
  return response.data;
};
//post API
export const postProductAPI = async (productData: IProduct) => {
  const response = await $axios.post<IPostRequest>("/product", productData);
  return response.data;
};
//ID별 update API
export const updateProductAPI = async (id: number, productUpdate: object) => {
  const response = await $axios.post(`/product/${id}`, productUpdate);
  return response.data;
};

//get ring API
export const getFilterAPI = async (requestParams: any) => {
  const response = await $axios.get(`/product/`, {
    params: requestParams,
  });
  return response.data;
};

export const getMainCarousel = async () => {
  const response = await $axios.get<IMainCarousel[]>("/mainImage");
  return response.data;
};

//get bestSellers
export const getBestSellerWeek = async () => {
  const response = await $axios.get<IBestSellerId[]>("/bestSellerWeek");
  return response.data;
};

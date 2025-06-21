import {
  GET_ALL_PRODUCT,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "../constants/API";
import type { Product } from "../model/Product";
import { DoCallAPIWithOutToken, DoCallAPIWithToken } from "./HttpService";

export const getAllProducts = () => {
  return DoCallAPIWithOutToken(GET_ALL_PRODUCT, "GET", null);
};

export const createProduct = (productData: Omit<Product, "id">) => {
  return DoCallAPIWithToken(ADD_PRODUCT, "POST", productData);
};

export const updateProduct = (id: string, productData: Omit<Product, "id">) => {
  return DoCallAPIWithToken(`${UPDATE_PRODUCT}${id}`, "PUT", productData);
};

export const deleteProduct = (id: string) => {
  return DoCallAPIWithToken(`${DELETE_PRODUCT}${id}`, "DELETE", null);
}; 
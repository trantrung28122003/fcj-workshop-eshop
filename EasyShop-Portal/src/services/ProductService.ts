import {
  GET_ALL_PRODUCT,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  PRESIGNED_URL,
} from "../constants/API";
import type { Product } from "../model/Product";
import { DoCallAPIWithOutToken, DoCallAPIWithToken } from "./HttpService";

export function getPresignedUrl(fileName: string, fileType: string) {
  return DoCallAPIWithOutToken(
    PRESIGNED_URL,
    "POST",
    { fileName, fileType }
  );
}

export async function UploadFileToS3Buket(uploadUrl: string, file: File) {
  const res = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type
    },
    body: file
  });
  if (!res.ok) {
    throw new Error(`Upload thất bại: ${res.status} ${res.statusText}`);
  }
  return res;
}

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
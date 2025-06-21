import {
  GET_ALL_CATEGORY,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} from "../constants/API";
import type { Category } from "../model/Category";
import { DoCallAPIWithOutToken, DoCallAPIWithToken } from "./HttpService";

export const getAllCategories = () => {
  return DoCallAPIWithOutToken(GET_ALL_CATEGORY, "GET", null);
};

export const createCategory = (categoryData: Omit<Category, "id">) => {
  return DoCallAPIWithToken(ADD_CATEGORY, "POST", categoryData);
};

export const updateCategory = (id: string, categoryData: Omit<Category, "id">) => {
  return DoCallAPIWithToken(`${UPDATE_CATEGORY}${id}`, "PUT", categoryData);
};

export const deleteCategory = (id: string) => {
  return DoCallAPIWithToken(`${DELETE_CATEGORY}${id}`, "DELETE", null);
}; 
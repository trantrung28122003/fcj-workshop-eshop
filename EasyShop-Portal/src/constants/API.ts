// const BASE_URL = "https://sd75skpq-8080.asse.devtunnels.ms";

const BASE_URL = import.meta.env.VITE_BASE_URL;

/**
 * upload
 */
const PRESIGNED_URL = BASE_URL + "/uploads";
/**
 * upload
 */

const GET_ALL_PRODUCT = BASE_URL + "/products";
const ADD_PRODUCT = BASE_URL + "/products"
const UPDATE_PRODUCT = BASE_URL + "/products"
const DELETE_PRODUCT = BASE_URL + "/products"

/**
 * product
 */

/**
 * category
 */
const GET_ALL_CATEGORY = BASE_URL +  "/categories";
const ADD_CATEGORY = BASE_URL +  "/categories";
const UPDATE_CATEGORY = BASE_URL + "/categories";
const DELETE_CATEGORY = BASE_URL + "/categories";
/**
 * category
 */

export {
  BASE_URL,
  GET_ALL_PRODUCT,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  GET_ALL_CATEGORY,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  PRESIGNED_URL
};

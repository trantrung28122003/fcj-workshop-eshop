// const BASE_URL = "https://sd75skpq-8080.asse.devtunnels.ms";
const BASE_URL = "https://localhost:44300/api";
/* 
  authentication
*/
const BASE_URL_AUTH = BASE_URL + "/api/authentication";
const LOGIN_URL = BASE_URL_AUTH + "/login";
const LOGIN_WITH_GOOGLE = BASE_URL_AUTH + "/loginWithGoogle"
const REGISTER_URL = BASE_URL_AUTH + "/register";

/* 
  authentication
*/





/*
  user
*/

const BASE_URL_USER = BASE_URL + "/api/users";
const GET_USER_INFO_URL = BASE_URL_USER + "/profile";
const UPDATE_PROFILE_USER = BASE_URL + "/customer/updateProfile"
const CHANGE_PASSWORD_BY_USER = BASE_URL + "/customer/changePassword"
const FORGOT_PASSWORD_URL = BASE_URL + "/email/sendVerificationCode"
const VERIFY_CODE_URL = BASE_URL + "/email/verifyCode"
const RESET_PASSWORD = BASE_URL +"/customer/resetPassword"
/*
  users
*/

/**
 * home
 */


const GET_NOTIFICATION_BY_USER = BASE_URL + "/api/notifications/current-user"
const GET_TOP_AUTHORS_POST = BASE_URL + "/api/posts/top-authors-post"
const UPDATE_NOTIFICATION_READ_STATUS = BASE_URL + "/customer/updateNotificationStatusIsRead"
const ADD_BLOG = BASE_URL +"/blog/addBlog"
const LIKE_BLOG = BASE_URL +"/blog/like"
const UN_LIKE_BLOG = BASE_URL +"/blog/unLike"
const GET_BLOGS = BASE_URL +"/blog"
const STATUS_LIKE_BLOG = BASE_URL +"/customer/status"

/**
 * home
 */

/**
 * product
 */
const BASE_URL_PRODUCT = BASE_URL + "/products";
const GET_ALL_PRODUCT = BASE_URL_PRODUCT + "/";
const ADD_PRODUCT = BASE_URL_PRODUCT + "/";
const UPDATE_PRODUCT = BASE_URL_PRODUCT + "/";
const DELETE_PRODUCT = BASE_URL_PRODUCT + "/";
/**
 * product
 */

/**
 * category
 */
const BASE_URL_CATEGORY = BASE_URL + "/categories";
const GET_ALL_CATEGORY = BASE_URL_CATEGORY + "/";
const ADD_CATEGORY = BASE_URL_CATEGORY + "/";
const UPDATE_CATEGORY = BASE_URL_CATEGORY + "/";
const DELETE_CATEGORY = BASE_URL_CATEGORY + "/";
/**
 * category
 */


export {
  BASE_URL,
  LOGIN_URL,
  GET_USER_INFO_URL,
  LOGIN_WITH_GOOGLE,
  REGISTER_URL,
  UPDATE_PROFILE_USER,
  CHANGE_PASSWORD_BY_USER,
  FORGOT_PASSWORD_URL,
  VERIFY_CODE_URL,
  RESET_PASSWORD,
  GET_NOTIFICATION_BY_USER,
  UPDATE_NOTIFICATION_READ_STATUS ,
  ADD_BLOG,
  GET_BLOGS,
  LIKE_BLOG,
  STATUS_LIKE_BLOG,
  UN_LIKE_BLOG,
  GET_TOP_AUTHORS_POST,
  BASE_URL_PRODUCT,
  GET_ALL_PRODUCT,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  BASE_URL_CATEGORY,
  GET_ALL_CATEGORY,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY
};

import axios from "axios";
import { getCredentials } from "../hooks/useLogin";

const DoCallAPIWithToken = async <T>(
  url: string,
  method: string,
  requestBody?: T | FormData
) => {
  const token = getCredentials();

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  };
  if (!(requestBody instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }
  return axios({
    method: method,
    url: url,
    data: requestBody,
    headers: headers,
  });
};

const DoCallAPIWithOutToken = async <T>(
  url: string,
  method: string,
  requestBody?: T | FormData
) => {
  return axios({
    method: method,
    url: url,
    data: requestBody,
  });
};

const COGNITO_REGION = import.meta.env.VITE_COGNITO_REGION;
const cognitoBaseUrl = `https://cognito-idp.${COGNITO_REGION}.amazonaws.com/`;

const DoCallCognitoAPI = async <T>(
  amzTarget: string,
  requestBody: T
) => {
  return axios({
    method: "POST",
    url: cognitoBaseUrl,
    headers: {
      "Content-Type": "application/x-amz-json-1.1",
      "X-Amz-Target": amzTarget,
    },
    data: requestBody,
  });
};

export { DoCallAPIWithToken, DoCallAPIWithOutToken, DoCallCognitoAPI };
import type { APISignInRequest } from "../model/Authentication";
import { DoCallCognitoAPI } from "./HttpService";

const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;

export const signUp = async (request: APISignInRequest) => {
  const body = {
    ClientId: clientId,
    Username: request.userName,
    Password: request.password,
    UserAttributes: [
      { Name: "email", Value: request.email },
      { Name: "name", Value: request.fullName },
    ],
  };
  return DoCallCognitoAPI("AWSCognitoIdentityProviderService.SignUp", body);
};


export const confirmSignUp = async (email: string, code: string) => {
  const body = {
    ClientId: clientId,
    Username: email,
    ConfirmationCode: code,
  };
  return DoCallCognitoAPI("AWSCognitoIdentityProviderService.ConfirmSignUp", body);
};


export const signIn = async (email: string, password: string) => {
  const body = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: clientId,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  };
  return DoCallCognitoAPI("AWSCognitoIdentityProviderService.InitiateAuth", body);
};
import { DoCallCognitoAPI } from "./HttpService";

const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;

export interface EmailVerificationRequest {
  userName: string;
}

export interface VerifyCodeRequest {
  userName: string;
  code: string;
}

export const resendVerificationCode = async (request: EmailVerificationRequest) => {
  const body = {
    ClientId: clientId,
    Username: request.userName,
  };
  return DoCallCognitoAPI("AWSCognitoIdentityProviderService.ResendConfirmationCode", body);
};

export const verifyEmailCode = async (request: VerifyCodeRequest) => {  
  const body = {
    ClientId: clientId,
    Username: request.userName,
    ConfirmationCode: request.code,
  };
  return DoCallCognitoAPI("AWSCognitoIdentityProviderService.ConfirmSignUp", body);
}; 
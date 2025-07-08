import { DoCallCognitoAPI } from "./HttpService";

const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;

export interface EmailVerificationRequest {
  email: string;
  userName: string;
}

export interface VerifyCodeRequest {
  email: string;
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
    Username: request.email,
    ConfirmationCode: request.code,
  };
  return DoCallCognitoAPI("AWSCognitoIdentityProviderService.ConfirmSignUp", body);
}; 
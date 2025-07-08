export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  authenticated: boolean;
  token: string;
}

export interface APISignInRequest {
  email: string;
  userName: string;
  fullName: string;
  password: string;
}

export interface SignInRequest extends APISignInRequest {
  imageName: string | null;
  confirmPassword: string;
  termAndConditions: boolean;
}

export interface AuthorResponse {
  id: string;
  fullName: string;
  avatar: string;
  postCount?: number;
}

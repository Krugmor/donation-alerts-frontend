import type { AxiosPromise } from "axios";
import { apiInstance } from "../base";

export type SignUpParams = {
  email: string;
  password: string;
};

export type SignUpResponse = {
  user: { id: number; email: string };
};

export const signUp = (data: SignUpParams): AxiosPromise<SignUpResponse> => {
  return apiInstance.post("/auth/signup", data);
};

export type SignInParams = {
  email: string;
  password: string;
};

export type SignInResponse = {
  token: string;
};

export const signIn = (data: SignUpParams): AxiosPromise<SignInResponse> => {
  return apiInstance.post("/auth/signin", data);
};

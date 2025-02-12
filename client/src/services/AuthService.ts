import { AxiosResponse } from "axios";
import { $axios } from "./axios/axiosInstance";
import { IUserToLogin } from "../../interfaces/users/IUserToLogin";
import { IUserToSignUp } from "../../interfaces/users/IUserToSignUp";
import { IAuthResponse } from "../../interfaces/responses/IAuthResponse";

export default class AuthService {
  static async login(user: IUserToLogin): Promise<AxiosResponse<IAuthResponse>> {
    return await $axios.post<IAuthResponse>("/login", user);
  }

  static async signUp(user: IUserToSignUp): Promise<AxiosResponse<IAuthResponse>> {
    return await $axios.post<IAuthResponse>("/signUp", user);
  }

  static async logout(): Promise<void> {
    return await $axios.post("/logout");
  }
}

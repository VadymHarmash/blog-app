import { IUser } from "../users/IUser";

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

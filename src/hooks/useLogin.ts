import { useMutation } from "react-query";
import { PostAPI } from "../api/post/post.api";
import {
  GetLoginResult,
  LoginRequestModel,
} from "../api/user/login/login.model";
import { UserAPI } from "../api/user/user.api";

export interface LoginResponseModel {
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  gender: string;
  role: string;
  token: string;
}

export const useLogin = () => {
  const { mutate, isLoading, error, data } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (params: LoginRequestModel) => {
      return await UserAPI.login(params);
    },
  });

  return { mutate, isLoading, error, data };
};

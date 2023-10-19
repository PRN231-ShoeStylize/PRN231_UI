import { useMutation } from "react-query";
import { PostAPI } from "../api/post/post.api";
import { LoginRequestModel } from "../api/user/login/login.model";
import { UserAPI } from "../api/user/user.api";

export const useLogin = () => {
  const { mutate, isLoading, error, data } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (params: LoginRequestModel): Promise<string> => {
      return await UserAPI.login(params);
    },
  });

  return { mutate, isLoading, error, data };
};
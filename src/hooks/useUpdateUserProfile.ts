import { useMutation } from "react-query";
import { UpdateProfileParams } from "../api/user/user.model";
import { UserAPI } from "../api/user/user.api";

export const useUpdateUserProfile = () => {
  const { mutate, isLoading, error, data } = useMutation({
    mutationKey: ["update_user"],
    mutationFn: async (params: UpdateProfileParams) => {
      return await UserAPI._updateProfile(params);
    },
  });

  return { mutate, isLoading, error, data };
};

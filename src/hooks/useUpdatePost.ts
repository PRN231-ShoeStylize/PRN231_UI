import { useMutation } from "react-query";
import { UpdateProfileParams } from "../api/user/user.model";
import { UserAPI } from "../api/user/user.api";
import { UpdatePostParams } from "../api/post/post.model";
import { PostAPI } from "../api/post/post.api";

export const useUpdatePostProfile = () => {
  const { mutate, isLoading, error, data } = useMutation({
    mutationKey: ["update_post"],
    mutationFn: async (params: UpdatePostParams & { postId: number }) => {
      return await PostAPI._updatePost(params, params.postId);
    },
  });

  return { mutate, isLoading, error, data };
};

import { useMutation } from "react-query";
import { PostAPI } from "../api/post/post.api";
import { CreatePostParams } from "../api/post/post.model";

export const useCreatePost = () => {
  const { mutate, isLoading, error, data } = useMutation({
    mutationKey: ["create_Post"],
    mutationFn: async (params: CreatePostParams) => {
      return await PostAPI.createPost(params);
    },
  });

  return { mutate, isLoading, error, data };
};

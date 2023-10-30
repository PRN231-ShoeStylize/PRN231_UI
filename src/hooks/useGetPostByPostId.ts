import { UseQueryResult, useMutation, useQuery } from "react-query";
import { PostAPI } from "../api/post/post.api";
import { GetPostResult } from "../api/post/post.model";

export const useGetPostByPostId = (postId: number) => {
  const { isError, isLoading, data }: UseQueryResult<GetPostResult, Error> =
    useQuery({
      queryKey: ["post", postId],
      queryFn: async () => {
        return await PostAPI.getPostByPostId(postId);
      },
    });

  return { isError, isLoading, data };
};

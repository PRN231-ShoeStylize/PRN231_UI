import { UseQueryResult, useMutation, useQuery } from "react-query";
import { PostAPI } from "../api/post/post.api";
import { GetPostResult } from "../api/post/post.model";

export const useGetPostByUserId = (userId: number) => {
  const { isError, isLoading, data }: UseQueryResult<GetPostResult[], Error> =
    useQuery({
      queryKey: ["posts", userId],
      queryFn: async () => {
        return await PostAPI.getPostByUserId(userId);
      },
    });

  return { isError, isLoading, data };
};

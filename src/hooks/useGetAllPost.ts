import { UseQueryResult, useMutation, useQuery } from "react-query";
import { PostAPI } from "../api/post/post.api";
import { GetPostResult } from "../api/post/post.model";

export const useGetAllPost = () => {
  const { isError, isLoading, data }: UseQueryResult<GetPostResult[], Error> =
    useQuery({
      queryKey: ["posts"],
      queryFn: async () => {
        return await PostAPI.getAllPost();
      },
    });

  return { isError, isLoading, data };
};

import { UseQueryResult, useMutation, useQuery } from "react-query";
import { PostAPI } from "../api/post/post.api";
import { GetPostResult } from "../api/post/post.model";
import { GetUserList, GetUserResult } from "../api/user/user.model";
import { UserAPI } from "../api/user/user.api";

export const useGetUserById = (id: number) => {
  const { isError, isLoading, data }: UseQueryResult<GetUserResult, Error> =
    useQuery({
      queryKey: ["user", id],
      queryFn: async () => {
        return await UserAPI._getById(id);
      },
    });

  return { isError, isLoading, data };
};

export const useGetUserByToken = () => {
  const {
    isError,
    isLoading,
    data,
    refetch,
  }: UseQueryResult<GetUserResult, Error> = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      return await UserAPI._getByToken();
    },
  });

  return { isError, isLoading, data, refetch };
};

export const useGetUsers = () => {
  const {
    isError,
    isLoading,
    data,
    refetch,
  }: UseQueryResult<GetUserList, Error> = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      return await UserAPI._getAllUser();
    },
  });

  return { isError, isLoading, data, refetch };
};

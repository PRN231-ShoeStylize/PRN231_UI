import { UseQueryResult, useQuery } from "react-query";
import {
  GetUserListParams,
  GetUserListResultByRole,
  GetUserResultByRole,
} from "../api/user/user.model";
import { UserAPI } from "../api/user/user.api";

export const useGetUserByRole = (params: GetUserListParams) => {
  const {
    isError,
    isLoading,
    data,
    refetch,
  }: UseQueryResult<GetUserListResultByRole, Error> = useQuery({
    queryKey: ["user_by_role"],
    queryFn: async () => {
      return await UserAPI._getUserByRole(params);
    },
  });

  return { isError, isLoading, data, refetch };
};

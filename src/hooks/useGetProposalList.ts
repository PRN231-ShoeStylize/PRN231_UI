import { UseQueryResult, useMutation, useQuery } from "react-query";
import { PostAPI } from "../api/post/post.api";
import { GetPostResult } from "../api/post/post.model";
import {
  GetProposalListResult,
  GetProposalParams,
} from "../api/proposal/proposal.model";
import { ProposalAPI } from "../api/proposal/proposal.api";

export const useGetProposalList = (params: GetProposalParams) => {
  const {
    isError,
    isLoading,
    data,
  }: UseQueryResult<GetProposalListResult, Error> = useQuery({
    queryKey: ["proposal-post", params],
    queryFn: async () => {
      return await ProposalAPI._getProposalList(params);
    },
  });

  return { isError, isLoading, data };
};

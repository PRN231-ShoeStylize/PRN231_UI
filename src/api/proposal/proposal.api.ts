import { httpClient, toQueryParams } from "../../utils/http-client";
import { apiPath } from "../path/apiPath";
import {
  CreateProposalParams,
  GetProposalListResult,
  GetProposalParams,
} from "./proposal.model";

export const ProposalAPI = {
  _createProposal: async (params: CreateProposalParams) => {
    const res = await httpClient.post<any>(apiPath.CreateProposal, params);
    return res.data;
  },

  _getProposalList: async (params: GetProposalParams) => {
    const res = await httpClient.get<GetProposalListResult>(
      `/Proposal?${toQueryParams(params)}`
    );
    return res.data;
  },
};

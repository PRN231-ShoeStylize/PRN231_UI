import { AxiosResponse } from "axios";
import { httpClient, toQueryParams } from "../../utils/http-client";
import { apiPath } from "../path/apiPath";
import { CreateProposalParams, GetProposalListResult, GetProposalParams, GetProposalResponse, IProposal } from "./proposal.model";
import queryString from 'query-string' 

export const ProposalAPI = {
    _createProposal : async (params: CreateProposalParams) => {
        const res = await httpClient.post<any>(apiPath.Proposal.Create, params);
        return res.data;
    },
    _getProposalList: async (params: GetProposalParams) => {
      const res = await httpClient.get<GetProposalListResult>(
        `/Proposal?${toQueryParams(params)}`
      );
      return res.data;
    },
    _getProposal : async (params: GetProposalParams) : Promise<AxiosResponse<GetProposalResponse>>  => {
        const res = await httpClient.get<GetProposalResponse>(`${apiPath.Proposal.Get}?${queryString.stringify(params)}`)
        return res
    }
}

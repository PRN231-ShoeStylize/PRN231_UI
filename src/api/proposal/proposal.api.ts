import { AxiosResponse } from "axios";
import { httpClient, toQueryParams } from "../../utils/http-client";
import { apiPath } from "../path/apiPath";
import {
  CreateProposalParams,
  GetProposalListResult,
  GetProposalParams,
  GetProposalResponse,
  IProposal,
  UpdateProposalParams,
} from "./proposal.model";
import queryString from "query-string";

export const ProposalAPI = {
  _createProposal: async (params: CreateProposalParams) => {
    const res = await httpClient.post<any>(apiPath.Proposal.Create, params);
    if (res !== undefined) {
      return res.data;
    }
    return undefined;
  },
  _getProposalList: async (params: GetProposalParams) => {
    const res = await httpClient.get<GetProposalListResult>(
      `/Proposal?${toQueryParams(params)}`
    );
    return res.data;
  },
  _getProposal: async (
    params: GetProposalParams
  ): Promise<AxiosResponse<GetProposalResponse>> => {
    const res = await httpClient.get<GetProposalResponse>(
      `${apiPath.Proposal.Get}?${queryString.stringify(params)}`
    );
    return res;
  },
  _getProposalById: async (id: number): Promise<AxiosResponse<IProposal>> => {
    const res = await httpClient.get<IProposal>(`/Proposal/${id}`);
    return res;
  },
  _updateProposal: async (
    id: number,
    params: UpdateProposalParams
  ): Promise<AxiosResponse<IProposal>> => {
    const res = await httpClient.put<IProposal>(`/Proposal/${id}`, params);
    return res;
  },
};

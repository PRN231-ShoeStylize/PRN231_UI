import { httpClient } from "../../utils/http-client";
import { apiPath } from "../path/apiPath";
import { CreateProposalParams } from "./proposal.model";

export const ProposalAPI = {
    _createProposal : async (params: CreateProposalParams) => {
        const res = await httpClient.post<any>(apiPath.CreateProposal, params);
        return res.data;
    }
}
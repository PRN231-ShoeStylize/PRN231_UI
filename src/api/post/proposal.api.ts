import { httpClient } from "../../utils/http-client";
import { CreateOrderParams } from "./propalsal.modal";

export const ProposalAPI = {
  createOrder: async (params: CreateOrderParams) => {
    const body = {
      price: params.price,
      address: params.address,
      proposalId: params.proposalId,
      paymentMethod: "COD",
    };
    const res = await httpClient.post<any>(
      `/Propalsal/${params.proposalId}/status?status=${params.status}`,
      body
    );
    return res.data;
  },
};

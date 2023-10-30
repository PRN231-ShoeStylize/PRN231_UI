import { httpClient } from "../../utils/http-client";
import { CreateOrderParams, GetOrderResult } from "./order.modal";

export const OrderAPI = {
  createOrder: async (params: CreateOrderParams) => {
    const body = {
      price: params.price,
      address: params.address,
      proposalId: params.proposalId,
      paymentMethod: "COD",
    };
    const res = await httpClient.put<any>(
      `/Proposal/${params.proposalId}/status?status=${params.status}`,
      body
    );
    return res.data;
  },
  getOrdersByUserToken: async () => {
    const res = await httpClient.get<GetOrderResult[]>(`/Orders/user`);
    return res.data;
  },
};

import { AxiosResponse } from "axios";
import { httpClient } from "../../utils/http-client";
import {
  CreateOrderParams,
  GetAllOrderResult,
  GetOrderResult,
} from "./order.modal";

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
  getOrderByUserTokenAndStatus: async (
    status: string | null
  ): Promise<AxiosResponse<GetOrderResult[]>> => {
    const res = await httpClient.get<GetOrderResult[]>(
      `/Orders/user?status=${status}`
    );
    return res;
  },
  updateOrderStatus: async (
    id: number,
    status: string
  ): Promise<AxiosResponse<any>> => {
    const res = await httpClient.put<any, string>(`/Orders/status/${id}`, {
      status: status,
    });
    return res;
  },
  _getOrders: async () => {
    const res = await httpClient.get<GetAllOrderResult[]>(`/Orders`);
    return res?.data;
  },
};

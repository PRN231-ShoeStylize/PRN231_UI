import { useMutation } from "react-query";
import { OrderAPI } from "../api/order/order.api";
import { CreateOrderParams } from "../api/order/order.modal";

export const useCreateOrder = () => {
  const { mutate, isLoading, error, data } = useMutation({
    mutationKey: ["create_order"],
    mutationFn: async (params: CreateOrderParams) => {
      return await OrderAPI.createOrder(params);
    },
  });

  return { mutate, isLoading, error, data };
};

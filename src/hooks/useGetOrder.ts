import { UseQueryResult, useQuery } from "react-query";
import { GetAllOrderResult, GetOrderResult } from "../api/order/order.modal";
import { OrderAPI } from "../api/order/order.api";

export const useGetOrderByToken = () => {
  const {
    isError,
    isLoading,
    data,
    refetch,
  }: UseQueryResult<GetOrderResult[], Error> = useQuery({
    queryKey: ["orders-token"],
    queryFn: async () => {
      return await OrderAPI.getOrdersByUserToken();
    },
  });

  return { isError, isLoading, data, refetch };
};

export const useGetAllOrders = () => {
  const {
    isError,
    isLoading,
    data,
    refetch,
  }: UseQueryResult<GetAllOrderResult[], Error> = useQuery({
    queryKey: ["orders-all"],
    queryFn: async () => {
      return await OrderAPI._getOrders();
    },
  });

  return { isError, isLoading, data, refetch };
};

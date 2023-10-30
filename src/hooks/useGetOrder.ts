import { UseQueryResult, useQuery } from "react-query";
import { GetOrderResult } from "../api/order/order.modal";
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

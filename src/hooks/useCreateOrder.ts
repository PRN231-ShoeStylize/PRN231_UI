import { useMutation } from "react-query";
import { CreateOrderParams } from "../api/post/propalsal.modal";
import { ProposalAPI } from "../api/post/proposal.api";

export const useCreateOrder = () => {
  const { mutate, isLoading, error, data } = useMutation({
    mutationKey: ["create_Order"],
    mutationFn: async (params: CreateOrderParams) => {
      return await ProposalAPI.createOrder(params);
    },
  });

  return { mutate, isLoading, error, data };
};

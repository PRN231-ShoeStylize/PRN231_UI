import { OrderStatus } from "../order/order.modal";

export interface CreateProposalParams {
  postId: number;
  description: string;
  price: number;
  submissionResources: string[];
}

export type GetProposalParams = {
  status?: OrderStatus;
  createdById?: number;
  postId?: number;
  sortCreatedAt?: string;
  sortPrice?: string;
  page?: number;
  size?: number;
  isOfCurrentUser?: boolean;
};

export type GetProposalResult = {
  createdById: number;
  createdByFirstName: string;
  createdByLastName: string;
  description: string;
  orderId: number;
  postId: number;
  price: number;
  status: OrderStatus;
  createdAt: Date;
  order: any;
  submissionResources: string[];
  id: number;
};

export type GetProposalListResult = {
  results: GetProposalResult[];
  totalRecord: number;
  totalPage: number;
};

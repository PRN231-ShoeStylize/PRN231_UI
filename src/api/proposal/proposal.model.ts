import { OrderStatus } from "../order/order.modal";

export interface CreateProposalParams {
  postId: number;
  description: string;
  price: number;
  submissionResources: string[];
}

export interface GetProposalParams {
  status?: string;
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
export interface GetProposalResponse {
  results: IProposal[]
 }

export enum ProposalStatus {
 Accepted = "Accepted",
 Rejected = "Rejected",
 Done = "Done",
 Pending = "Pending",
}

export interface IProposal {
   id: number
   createdById: number,
   createdByFirstName: string,
   createdByLastName: string,
   description: string,
   orderId: number,
   postId: number,
   price: number,
   status: ProposalStatus,
   createdAt: string,
   submissionResources: string[]
}
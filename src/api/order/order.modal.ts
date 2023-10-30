export enum OrderStatus {
  Accepted = "Accepted",
  Rejected = "Rejected",
  Done = "Done",
  Pending = "Pending",
}

export type CreateOrderParams = {
  price: number;
  address: string;
  proposalId: number;
  paymentMethod: "COD";
  status: OrderStatus;
};

export type GetOrderResult = {
  price: number;
  address: string;
  status: string;
  createdAt: Date;
  paymentMethod: string;
  orderStatus: string;
  proposal: {
    createdById: 0;
    createdByFirstName: string;
    createdByLastName: string;
    description: string;
    orderId: number;
    postId: number;
    price: number;
    status: string;
    createdAt: Date;
    order: any;
    post: {
      content: string;
      resourceUrl: string;
      expireDate: Date;
      createdAt: Date;
      modifiedAt: any;
      onwerId: number;
      modifiedById: number;
      status: string;
      postResources: any;
      id: number;
    };
    submissionResources: any;
    id: number;
  };
  proposalId: number;
  shipmentId: number;
  id: number;
};

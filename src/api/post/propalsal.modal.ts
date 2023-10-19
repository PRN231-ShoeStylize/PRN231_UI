export type CreateOrderParams = {
  price: number;
  address: string;
  proposalId: number;
  paymentMethod: "COD";
  status: OrderStatus;
};

export enum OrderStatus {
  Accepted = "Accepted",
  Rejected = "Rejected",
  Done = "Done",
  Pending = "Pending",
}

export type GetUserResult = {
  email: string;
  firstname: string;
  lastname: string;
  phonenumber: string;
  birthday: string;
  avatarUrl: string;
  shoeSize: number;
  gender: string;
  role: string;
  createAt: string;
  status: string;
  businessPortfolioId: number;
  portfolio: any;
  ownPosts: any;
  modidifiedPost: any;
  id: number;
};

export type UpdateProfileParams = {
  firstname: string;
  lastname: string;
  phonenumber: string;
  birthday: Date;
  // avatarUrl: string;
  shoeSize: number;
  gender: string;
};

export enum UserRole {
  CUSTOMER = "Customer",
  PROVIDER = "Provider",
  ADMIN = "Admin",
}

export type GetUserListParams = {
  role: UserRole;
};

export type GetUserResultByRole = {
  id: number;
  firstname: string;
  lastname: string;
  avatarUrl: string;
  role: string;
};

export type GetUserListResultByRole = {
  results: GetUserResultByRole[];
  totalRecord: number;
  totalPage: number;
};

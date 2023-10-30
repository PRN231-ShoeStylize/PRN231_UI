export interface LoginRequestModel {
  email: string;
  password: string;
}

export type GetLoginResult = {
  email: string;
  firstname: string;
  lastname: string;
  avatarUrl: string;
  gender: string;
  role: string;
  token: string;
};

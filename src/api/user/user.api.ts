import { TOKEN } from "../../constants/constants";
import { httpClient, toQueryParams } from "../../utils/http-client";
import { GetLoginResult, LoginRequestModel } from "./login/login.model";
import {
  GetUserListParams,
  GetUserResult,
  GetUserListResultByRole,
  UpdateProfileParams,
} from "./user.model";

export const UserAPI = {
  login: async (params: LoginRequestModel) => {
    const res = await httpClient.post<GetLoginResult>(
      `/Authenticate/signin`,
      params
    );
    return res?.data;
  },
  _getById: async (id: number) => {
    const res = await httpClient.get<GetUserResult>(`/Users/${id}`);
    return res.data;
  },
  _getByToken: async () => {
    const res = await httpClient.get<GetUserResult>(`/Users/account`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(TOKEN)}`,
      },
    });
    return res.data;
  },
  _updateProfile: async (params: UpdateProfileParams) => {
    const res = await httpClient.put<any>(`/Users/account`, params, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(TOKEN)}`,
      },
    });
    return res.data;
  },
  _getUserByRole: async (params: GetUserListParams) => {
    const res = await httpClient.get<GetUserListResultByRole>(
      `/Users/role?${toQueryParams(params)}`
    );
    console.log(res.data);

    return res.data;
  },
};

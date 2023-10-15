import { httpClient } from "../../utils/http-client";
import { LoginRequestModel } from "./login/login.model";

export const UserAPI = {
  login: async (params: LoginRequestModel) => {
    const res = await httpClient.post<string>(`/Authenticate/signin`, params);
    return res.data;
  },
};

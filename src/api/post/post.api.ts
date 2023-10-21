import { AxiosResponse } from "axios";
import { httpClient } from "../../utils/http-client";
import { CreatePostParams, GetPostResult } from "./post.model";

export const PostAPI = {
  getAllPost: async (): Promise<AxiosResponse<GetPostResult[]>> => {
    const res = await httpClient.get<GetPostResult[]>(`/Post`);
    return res.data;
  },
  createPost: async (params: CreatePostParams) => {
    const res = await httpClient.post<any>(`/Post`, params);
    return res.data;
  },
  getPostByUserId: async (userId: number) => {
    const res = await httpClient.get<GetPostResult[]>(`/Post/user/${userId}`);
    return res.data;
  },
};

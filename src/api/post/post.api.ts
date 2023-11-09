import { AxiosResponse } from "axios";
import { httpClient } from "../../utils/http-client";
import {
  CreatePostParams,
  GetPostResult,
  UpdatePostParams,
} from "./post.model";
import { TOKEN } from "../../constants/constants";

export const PostAPI = {
  getAllPost: async (): Promise<GetPostResult[]> => {
    const res = await httpClient.get<GetPostResult[]>(`/Post`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(TOKEN)}`,
      },
    });
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
  getPostByPostId: async (postId: number) => {
    const res = await httpClient.get<GetPostResult>(`/Post/${postId}`);
    return res.data;
  },
  _updatePost: async (params: UpdatePostParams, postId: number) => {
    const res = await httpClient.put<any>(`/Post/${postId}`, params);
    return res.data;
  },
  _getPostsForProvider: async (): Promise<GetPostResult[]> => {
    const res = await httpClient.get<GetPostResult[]>(`/Post/provider`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(TOKEN)}`,
      },
    });
    return res.data;
  },
};

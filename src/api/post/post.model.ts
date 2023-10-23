export type GetPostResult = {
  content: string;
  resourceUrl: string;
  expireDate: Date;
  createdAt: Date;
  modifiedAt: any;
  onwerId: number;
  modifiedById: number;
  status: string;
  postResources: string[];
  id: number;
};

export type CreatePostParams = {
  content: string;
  resourceUrl: string;
  postResources: string[];
};

export interface IPost{
  content: string;
  resourceUrl: string;
  expireDate: Date;
  createdAt: Date;
  modifiedAt: any;
  onwerId: number;
  modifiedById: number;
  status: string;
  postResources: string[];
  id: number;
}
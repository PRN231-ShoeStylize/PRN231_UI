import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { TOKEN_HAS_EXPIRED } from "../constants/constants";
import { TOKEN } from "../constants/constants";

const _getConfig = (config?: AxiosRequestConfig) => {
  return {
    ...config,
    baseURL: process.env.REACT_APP_SERVER_LINK,
    timeout: 10000,
    headers: {
      ...config?.headers,
      Authorization: `Bearer ${
        sessionStorage.getItem(TOKEN) || localStorage.getItem(TOKEN)
      }`,
    },
  };
};

const _get = <T = any, R = AxiosResponse<T>>(
  url: string,
  config?: AxiosRequestConfig
) => {
  return axios.get<T, R>(url, _getConfig(config));
};

const _post = <T = any, R = AxiosResponse<T>>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
) => {
  return axios.post<T, R>(url, data, _getConfig(config));
};

const _put = <T = any, R = AxiosResponse<T>>(
  url: string,
  data: any,
  config?: AxiosRequestConfig
) => {
  return axios.put<T, R>(url, data, _getConfig(config));
};

const _delete = <T = any, R = AxiosResponse<T>>(
  url: string,
  config?: AxiosRequestConfig
) => {
  return axios.delete<T, R>(url, _getConfig(config));
};

export const httpClient = {
  get: <T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ) => {
    return _get(url, config);
  },
  post: <T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => {
    return _post(url, data, config);
  },
  put: <T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => {
    return _put(url, data, config);
  },
  delete: <T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ) => {
    return _delete(url, config);
  },
};

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Check if the token has expired
    if (error.response?.status === 401) {
      // do something here
      sessionStorage.setItem(TOKEN_HAS_EXPIRED, "true");
    }
  }
);

export const toQueryParams = (data: any): string => {
  const qs = Object.keys(data)
    .map((key) =>
      Array.isArray(data[key])
        ? data[key].map((v: string) => `${key}=${v}`).join("&")
        : `${key}=${data[key]}`
    )
    .join("&");

  return qs;
};

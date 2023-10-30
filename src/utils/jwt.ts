import jwtDecode from "jwt-decode";
import { TOKEN, TOKEN_HAS_EXPIRED } from "../constants/constants";

export type decodeType = {
  ["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]: string;
  ["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]: string;
  exp: number;
  iss: string;
  aud: string;
};

export const decode = (token: string | undefined): decodeType => {
  if (!token) {
    return {
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": "",
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier":
        "",
      exp: 0,
      aud: "0",
      iss: "0",
    };
  }
  const decodedData: decodeType = jwtDecode(token);
  return decodedData;
};

export const isTokenValid = (): string | undefined => {
  const token = sessionStorage.getItem(TOKEN);
  const isTokenExpired = sessionStorage.getItem(TOKEN_HAS_EXPIRED);

  if (token && !isTokenExpired) {
    return token;
  } else {
    return undefined;
  }
};

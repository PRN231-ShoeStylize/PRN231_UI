import jwtDecode from "jwt-decode";

export type decodeType = {
  ["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]: string;
  ["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]: string;
  exp: number;
  iss: string;
  aud: string;
};

export const decode = (token: string): decodeType => {
  const decodedData: decodeType = jwtDecode(token);
  return decodedData;
};

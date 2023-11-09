export const convertSubString = (str: string, count: number = 16): string => {
  if (!str) return "";
  if (str.length > count) return str.substring(0, count) + "...";
  else {
    return str;
  }
};

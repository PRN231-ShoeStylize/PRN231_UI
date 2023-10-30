// import { includes } from "lodash";

// export function setInitForm<TData, TKey extends keyof TData>(
//   data: TData,
//   keys: TKey[],
//   setValue: (key: TKey, value: TData[TKey]) => void
// ): void {
//   for (const key in data) {
//     let keyData = key as unknown as TKey;
//     if (includes(keys, keyData)) {
//       setValue(keyData, data[keyData]);
//     }
//   }
// }

import { includes, mapKeys } from "lodash";

export function setInitForm<TData, TKey extends keyof TData>(
  data: TData,
  keys: TKey[],
  setValue: (key: TKey, value: any) => void
): void {
  if (data) {
    mapKeys<Record<string, any>>(data, (value, key: TKey) => {
      if (includes(keys, key)) {
        setValue(key, value);
      }
    });
  }
}

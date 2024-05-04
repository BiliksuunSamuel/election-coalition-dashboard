import configuration from "../configuration";
import { HttpContentTypes, HttpMethods } from "../types";
import Axios from "axios";

export interface IHttpClient {
  data?: any;
  url?: string;
  method: HttpMethods;
  contentType?: HttpContentTypes;
  params?: any;
  token?: string | null | undefined;
}

export default function HttpClient<T>({
  method,
  url,
  token,
  params,
  data,
  contentType = "application/json",
}: IHttpClient) {
  switch (contentType) {
    case "multipart/form-data":
      return PostClient<T>({ method, url, data, params, token });

    default:
      return BaseApiClient<T>({ method, url, data, token, params });
  }
}

function BaseApiClient<T>({
  method,
  url,
  token,
  params,
  data,
  contentType = "application/json",
}: IHttpClient) {
  return new Promise<T>(function (resolve, reject) {
    try {
      Axios({
        baseURL: configuration().baseUrl,
        method,
        url,
        params,
        data,
        headers: {
          ContentType: contentType,
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => resolve(response.data as T))
        .catch((error) =>
          reject(
            error?.response?.data?.message ||
              error?.response?.message ||
              error?.message ||
              error?.error ||
              error
          )
        );
    } catch (error: any) {
      reject(error?.message || error?.error || error);
    }
  });
}

function PostClient<T>({
  url,
  token,
  params,
  data,
  contentType = "application/json",
}: IHttpClient) {
  return new Promise<T>(async function (resolve, reject) {
    try {
      const requestUrl = `${configuration().baseUrl}/${url}`;
      const res = await Axios.post(requestUrl, data, {
        params,
        headers: {
          ContentType: contentType,
          Authorization: `Bearer ${token}`,
        },
      });
      resolve(res.data as T);
    } catch (error: any) {
      if (error?.response?.status === 400) {
        const errors: string[] = error?.response?.data?.message ?? [];
        var errorMessage = "";
        errors.forEach((element) => {
          errorMessage += `  ${element}  `;
        });
        reject(errorMessage ?? "Validation Error");
      } else {
        reject(
          error?.response?.data?.message ||
            error?.response?.message ||
            error?.message ||
            error?.error ||
            error
        );
      }
    }
  });
}

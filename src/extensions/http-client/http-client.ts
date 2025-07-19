// src/lib/http-client.ts

export interface HttpResponseMessage<T> {
  status: number;
  data: T;
}

interface RequestOptions<T> {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  data?: T;
}

export const HttpClient = (baseUrl: string) => {
  const send = async <T>(
    path: string,
    { method, data }: RequestOptions<T>
  ): Promise<HttpResponseMessage<T>> => {
    const response = await fetch(`${baseUrl}/${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    const result = response.status !== 204 ? await response.json() : null;

    return {
      status: response.status,
      data: result as T,
    };
  };

  return {
    get: <T>(path: string): Promise<HttpResponseMessage<T>> =>
      send<T>(path, { method: "GET" }),

    post: <T>(path: string, data: T): Promise<HttpResponseMessage<T>> =>
      send<T>(path, { method: "POST", data }),

    put: <T>(path: string, data: T): Promise<HttpResponseMessage<T>> =>
      send<T>(path, { method: "PUT", data }),

    patch: <T>(path: string, data: T): Promise<HttpResponseMessage<T>> =>
      send<T>(path, { method: "PATCH", data }),

    delete: (path: string): Promise<HttpResponseMessage<null>> =>
      send<null>(path, { method: "DELETE" }),
  };
};

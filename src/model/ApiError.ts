export interface ApiError {
  message: string;
  error: string;
  statusCode: number;
}

export interface HttpResponse<T> {
  status: number;
  data: T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isApiError(data: any): data is ApiError {
  return (
    data &&
    typeof data.message === "string" &&
    typeof data.statusCode === "number" &&
    typeof data.error === "string"
  );
}

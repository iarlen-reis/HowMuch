import type { UseFetchOptions } from "#app";

export default async function <T>(path: string, options?: UseFetchOptions<T>) {
  let headers: HeadersInit = {};

  const config = useRuntimeConfig();

  const token = useCookie("token").value;

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return useFetch(config.public.baseUrl + path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...headers,
      ...options?.headers,
    },
  });
}

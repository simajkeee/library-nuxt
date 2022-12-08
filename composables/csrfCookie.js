import { useBaseUrl } from "./baseUrl";

export function useCsrfCookie() {
    return useFetch("/sanctum/csrf-cookie", {
        baseURL: useBaseUrl(),
        method: "GET",
        credentials: "include", // is used to retreive csrf cookie
    });
}
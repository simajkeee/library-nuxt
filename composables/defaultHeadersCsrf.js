import { useDefaultHeaders } from "./defaultHeaders";

export function useDefaultHeadersCsrf() {
    const headers = useDefaultHeaders();
    const token = useCookie("XSRF-TOKEN");
    if (token.value) {
        headers.append("X-XSRF-TOKEN", token.value);
    }
    return headers;
}
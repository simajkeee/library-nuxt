import { useDefaultHeaders } from "./defaultHeaders";

export function useDefaultHeadersCsrf() {
    const headers = useDefaultHeaders();
    if (!process.client) {
        return headers;
    }
    
    const token = useCookie("XSRF-TOKEN");
    if (token.value) {
        headers.append("X-XSRF-TOKEN", token.value);
    }

    return headers;
}
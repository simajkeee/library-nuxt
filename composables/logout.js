import { useBaseUrl } from "./baseUrl";
import { useDefaultHeadersCsrf } from "./defaultHeadersCsrf";

export function useLogout() {
    return $fetch("/logout", {
        method: "POST",
        baseURL: useBaseUrl(),
        headers: useDefaultHeadersCsrf(),
        credentials: "include",
    });
}
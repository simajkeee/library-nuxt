import { useBaseUrl } from "./baseUrl";
import { useDefaultHeadersCsrf } from "./defaultHeadersCsrf";

export function useLogout() {
    $fetch("/logout", {
        method: "POST",
        baseURL: useBaseUrl(),
        headers: useDefaultHeadersCsrf(),
        credentials: "include",
    });
    navigateTo({
        path: "/"
    });
}
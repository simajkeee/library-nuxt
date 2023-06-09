import { useFetchUnathorizedRedirect } from "./fetchUnathorizedRedirect";

export function useCurrentUserUnathorizedRedirect() {
    let headers = useDefaultHeadersCsrf();
    if (!process.client) {
        let {getDefaultUser} = useUserStoreValues()
        return getDefaultUser()
    }
    return useFetchUnathorizedRedirect("/api/user", {
        baseURL: useBaseUrl(),
        method: "GET",
        headers,
        credentials: "include",
    });
}
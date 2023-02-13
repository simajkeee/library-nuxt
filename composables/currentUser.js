export function useCurrentUser() {
    if (!process.client) {
        let {getDefaultUser} = useUserStoreValues()
        return getDefaultUser()
    }
    return $fetch("/api/user", {
        baseURL: useBaseUrl(),
        method: "GET",
        headers: useDefaultHeadersCsrf(),
        credentials: "include",
    });
}
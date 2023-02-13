export async function useRegister(body) {
    await useCsrfCookie();
    return $fetch("/register", {
        baseURL: useBaseUrl(),
        method: "POST",
        headers: useDefaultHeadersCsrf(),
        credentials: "include",
        body,
    });
}
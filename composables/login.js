import { useBaseUrl } from "./baseUrl";
import { useDefaultHeadersCsrf } from "./defaultHeadersCsrf";

export async function useLogin(email, password) {
    const { data:d, pending:p, error:e, refresh:r } = await useCsrfCookie();

    if (e.value) {
        return { d, p, e, r };
    }

    const headers = useDefaultHeadersCsrf();
    const loginPromise = await new Promise(async (resolve, reject) => {
        let responsetext = "";
        try {
            const loginResp = await $fetch("/login", {
                baseURL: useBaseUrl(),
                method: "POST",
                headers,
                credentials: "include", // must have
                body: JSON.stringify({
                    "email": email.value,
                    "password": password.value,
                }),
                parseResponse(responseText) {
                    responsetext = JSON.parse(responseText);
                    return responseText;
                }
            });
            resolve(loginResp);
        } catch (err) {
            reject(responsetext);
        }
    });

    return useAsyncData("login", () => loginPromise);
}
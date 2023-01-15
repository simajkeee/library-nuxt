import { useBaseUrl } from "./baseUrl";

export function useLogin(email, password) {
    return new Promise(async (resolve, reject) => {
        let responsetext = "";
        let headers = useDefaultHeadersCsrf();
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
}
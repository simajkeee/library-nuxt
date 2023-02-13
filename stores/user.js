import { defineStore } from "pinia"
import { useLogin } from "~~/composables/login";
import { useLogout } from "~~/composables/logout";
import { useCurrentUserUnathorizedRedirect } from "~~/composables/currentUserUnathorizedRedirect";

const defaultUser = {
    id: 0,
    name: "",
    email: "",
};

export const useUserStore = defineStore(
    "user", 
    () => {
        const user = ref(defaultUser);

        const isLoggedIn = computed(() => {
            return user.value.email !== "" && user.value.email !== undefined;
        });

        async function logIn(email, password) {
            await useCsrfCookie();
            const user = await useLogin(email, password);
            setUser(parseUserData(user))
        }

        async function logOut() {
            await useCsrfCookie();
            await useLogout();
            setUser(defaultUser);
            navigateTo({
                path: "/"
            });
        }

        async function getUserUnothorizedRedirect() {
            await useCsrfCookie();
            return useCurrentUserUnathorizedRedirect();
        }

        async function getCurrentUser() {
            await useCsrfCookie();
            return useCurrentUser()
        }

        function getDefaultUser() {
            return defaultUser;
        }

        function setUser(newUser) {
            user.value.id = newUser.id;
            user.value.name = newUser.name;
            user.value.email = newUser.email;
        }

        function parseUserData(userData) {
            if (!userData || userData == undefined) {
                return defaultUser;
            }
            return {
                id: userData.id,
                name: userData.name,
                email: userData.email,
            };
        }

        return { 
            user,
            isLoggedIn,
            logIn,
            logOut,
            getUserUnothorizedRedirect,
            getCurrentUser,
            getDefaultUser,
        };
    },
    {
        persist: {
            enabled: true,
            strategies: [
                {
                    key: "user",
                    storage: process.client ? localStorage : null
                }
            ]
        }
    }
);
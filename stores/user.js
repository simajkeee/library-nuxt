import { defineStore } from "pinia"
import { useCurrentUser } from "~~/composables/currentUser";
import { useLogin } from "~~/composables/login";
import { useLogout } from "~~/composables/logout";

const defaultUser = {
    id: 0,
    name: "",
    email: "",
};

export const useUserStore = defineStore(
    "user", 
    () => {
        const user = ref(defaultUser)//useState("user", () => defaultUser);

        const isLoggedIn = computed(() => {
            return user.value.email !== "" && user.value.email !== undefined;
        });

        async function logIn(email, password) {
            await useCsrfCookie();
            await useLogin(email, password);
            const currentUser = await useCurrentUser();
            setUser(currentUser);
        }

        async function logOut() {
            await useCsrfCookie();
            await useLogout();
            setUser(defaultUser);
        }

        async function getUser() {
            await useCsrfCookie();
            return useCurrentUser();
        }

        function getDefaultUser() {
            return defaultUser;
        }

        function setUser(currentUser) {
            user.value = {
                id: currentUser.id,
                name: currentUser.name,
                email: currentUser.email,
            };
        }

        return { 
            user,
            isLoggedIn,
            logIn,
            logOut,
            getUser,
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
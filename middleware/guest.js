export default defineNuxtRouteMiddleware((to, from) => {
    const {isLoggedIn, getCurrentUser} = useUserStoreValues();
    if (isLoggedIn?.value) {
        return getCurrentUser()
                .then(response => {
                    usePatchStoreUser(response)
                    return navigateTo("/")
                }).catch(error => {});
    }
});
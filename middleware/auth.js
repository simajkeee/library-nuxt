export default defineNuxtRouteMiddleware((to, from) => {
    const {isLoggedIn, getCurrentUser} = useUserStoreValues();
    if (!isLoggedIn.value) {
        getCurrentUser().then(user => {
            usePatchStoreUser(user);
        }).catch(() => {
            navigateTo("/");
        });
    }
});
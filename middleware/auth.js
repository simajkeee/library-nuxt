export default defineNuxtRouteMiddleware((to, from) => {
    const {isLoggedIn, getUser} = useUserStoreValues();
    if (!isLoggedIn.value) {
        getUser().then(user => {
            usePatchStoreUser(user);
        });
    }
});
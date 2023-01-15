export function useFetchUnathorizedRedirect(request, options = {}) {
    console.log("test");
    return $fetch(request, {
        ...options,
        async onResponseError({ request, response, options }) {
            console.log('[fetch response error in composable]')
            console.log(response.status === 401);
            if (response.status === 401) {
                const {store, getDefaultUser} = useUserStoreValues();
                store.$patch({
                    user: getDefaultUser()
                });
                navigateTo({
                    path: "/login"
                })
            }
        }
    });
}
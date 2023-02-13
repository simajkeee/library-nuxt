export function useFetchUnathorizedRedirect(request, options = {}) {
    return $fetch(request, {
        ...options,
        async onResponseError({ request, response, options }) {
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
import { useUserStore } from "~~/stores/user";

export function usePatchStoreUser(userPatch) {
    useUserStore().$patch({
        user: {
            id: userPatch.id,
            name: userPatch.name,
            email: userPatch.email,
        }
    })
}
import { storeToRefs } from "pinia";
import { useUserStore } from "~~/stores/user";

export function useUserStoreValues() {
    let store = useUserStore();
    let {logIn, logOut, getUser, getDefaultUser} = store;
    let {user, isLoggedIn} = storeToRefs(store);
    

    return { 
        store,
        user,
        isLoggedIn,
        logIn,
        logOut,
        getUser,
        getDefaultUser,
    };
}
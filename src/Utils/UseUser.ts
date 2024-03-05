import { useEffect, useState } from "react";
import UserModel from "../Models/UserModel";
import { authStore } from "../Redux/AuthState";

// the custom hook will set local state of the user from global state or server,
// get the current auth global state,
// subscribe for changes and unsubscribe
// and will return the user object:
function useUserAndSubscribe(){
    const [user, setUser] = useState<UserModel>();

    useEffect(() => {
        // get user info:
        setUser(authStore.getState().user);

        // subscribe for changes if user status is changed:
        let unsubscribe = authStore.subscribe(() =>
            setUser(authStore.getState().user))

        return unsubscribe;
    }, []);
    return user;
}

export default useUserAndSubscribe;
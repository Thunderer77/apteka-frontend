import {useUser} from "./UserProvider";
import React from "react";

export const Logout = () => {
    const {setUser} = useUser();

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <div>
            <h2>Logout</h2>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    );
};
export default Logout;
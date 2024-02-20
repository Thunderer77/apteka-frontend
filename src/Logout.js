import {useUser} from "./UserProvider";
import React from "react";
import {useNavigate} from "react-router-dom";

export const Logout = () => {
    const {setUser} = useUser();
    const navigate = useNavigate();
    const handleLogout = () => {
        setUser(null);
        navigate('/')
    };

    return (
        <div>
            <h2>Выход</h2>
            <br/>
            <button onClick={handleLogout}>Вы уверены?</button>
        </div>
    );
};
export default Logout;
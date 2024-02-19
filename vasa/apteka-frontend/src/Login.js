import {useUser} from "./UserProvider";
import React from "react";

export const Login = () => {
    const {setUser} = useUser();

    const handleLogin = () => {
        // Ваша логика аутентификации пользователя
        const user = {name: 'John Doe', email: 'john@example.com'};
        setUser(user);
    };

    return (
        <div>
            <h2>Login</h2>
            <button onClick={handleLogin}>Log In</button>
        </div>
    );
};


export default Login;
import React, {useState} from 'react';
import {useUser} from './UserProvider';
import {Link, redirect, useNavigate} from "react-router-dom";
import * as PropTypes from "prop-types";



const LoginForm = () => {
    const {user, setUser} = useUser();
    const [loginData, setLoginData] = useState({username: '', password: ''});
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();


    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setLoginData({...loginData, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const {username, password} = loginData;
        fetch('http://127.0.0.1:8000/users/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                data = data.find(x => x.login === loginData.username && x.password === loginData.password)
                setUser(data);
                setIsLoading(false)
            })
            .catch(error => {
                setIsLoading(true)
            });
        if (isLoading){

        }
        else if (!isLoading && user.login === loginData.username && user.password === loginData.password) {
                navigate('/profile');
        } else {
            alert('Неверный логин или пароль');
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <h1>Вход</h1>
            <p className=""><input
                type="text"
                name="username"
                value={loginData.username}
                onChange={handleInputChange}
                placeholder="Логин"
            />
            </p>

            <p>
                <input
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleInputChange}
                    placeholder="Пароль"
                />
            </p>
            <p>
                <button type="submit">Войти</button>

            </p>
            <p><Link to="/reg">Нет аккаунта?</Link></p>
        </form>
    );
};

export default LoginForm;
import React from "react";
import {useUser} from "./UserProvider";
import {Link, useNavigate} from "react-router-dom";
import RegistrForm from "./RegistrForm";

const Profile = () => {
    let {user, setUser} = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        setTimeout(() => {
            setUser(null);
            navigate('/log')
        }, 500)
    };


    return (user ? (<div>
            <p><strong>Имя:</strong> {user.name}</p>
            <p><strong>Фамилия:</strong> {user.s_name}</p>
            <p><strong>ДР:</strong> {user.birth}</p>
            <p><strong>Пол:</strong> {user.gender}</p>
            <p><strong>Логин:</strong> {user.login}</p>
            <p><strong>Пароль:</strong> {user.password}</p>
            <p><strong>Роль:</strong> {user.role}</p>
            <p><strong>Роль:</strong> {user.balance}</p>
            <Link to="/logout">
                <button type='button' className='btn btn-primary mt-3'>Выйти</button>
            </Link></div>) : <div>{handleLogout()}Переадресация....</div>
    );
};


export default Profile
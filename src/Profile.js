import React from "react";
import {useUser} from "./UserProvider";
import {Link, useNavigate} from "react-router-dom";
import RegistrForm from "./RegistrForm";
import axios from "axios";

const Profile = () => {
    let {user, setUser} = useUser();
    const navigate = useNavigate();


    // Обработчик нажатия кнопки "Удалить"
    const handleDelete = () => {
        if (window.confirm('Вы уверены?')) {

        axios.get(`http://127.0.0.1:8000/user/${user.id}/delete/`)
            .then(response => {
                console.log('User deleted:', response.data);
                navigate('/log');
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
        }
    };
    const handleLogout = () => {
        setTimeout(() => {
            setUser(null);
            navigate('/log')
        }, 500)
    };

    return (user ? (<>
                <p><strong>Имя:</strong> {user.name}</p>
                <p><strong>Фамилия:</strong> {user.s_name}</p>
                <p><strong>ДР:</strong> {user.birth}</p>
                <p><strong>Пол:</strong> {user.gender}</p>
                <p><strong>Логин:</strong> {user.login}</p>
                <p><strong>Пароль:</strong> {user.password}</p>
                <p><strong>Роль:</strong> {user.role === 0 ? "Админ" : "Клиент"}</p>
                <p><strong>Денег:</strong> {user.balance}</p>
                <div className="container p-3 pb-4 d-flex justify-content-around">
                    {user?.role === 0}
                    <Link to={`/user/${user.id}/get`}>
                        <button type='button' className='btn btn-primary mt-3'>Изменить</button>
                    </Link>

                    <button type='button' className='btn btn-danger mt-3'
                            onClick={handleDelete}>Удалить
                    </button>

                    <Link to="/logout">
                        <button type='button' className='btn btn-primary mt-3'>Выйти</button>
                    </Link>
                </div>
            </>) :
            <> {handleLogout()}Переадресация....</>
    )
        ;
};


export default Profile
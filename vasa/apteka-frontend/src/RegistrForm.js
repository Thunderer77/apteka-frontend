import React, {useState} from 'react';
import {useUser} from "./UserProvider";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
const csrftoken = getCookie('csrftoken');

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Ищем CSRF токен по имени
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        s_name: '',
        birth: '',
        gender: '',
        login: '',
        password: '',
        role: 0,
        balance: 0
    });

    const {user, setUser} = useUser();
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted with data:', formData);
        axios.post('http://127.0.0.1:8000/user/add', formData, {
            headers: {
                'X-CSRFToken': `${ csrftoken }`, // Вставка CSRF токена
                'Content-Type': 'application/x-www-form-urlencoded' // Установка заголовка Content-Type
            }
        })
            .then(response => {
                console.log('User registered:', response.data);
                if (response.data.error) return null
                else {
                    setUser(formData)
                navigate('/profile');
                }
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });
    };


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Имя:</label><br/>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="s_name">Фамилия:</label><br/>
                <input type="text" id="s_name" name="s_name" value={formData.s_name} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="birth">Дата рождения:</label><br/>
                <input type="date" id="birth" name="birth" value={formData.birth} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="gender">Пол:</label><br/>
                <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="Men">Мужской</option>
                    <option value="Woman">Женский</option>
                </select>
            </div>
            <div>
                <label htmlFor="login">Логин:</label><br/>
                <input type="text" id="login" name="login" value={formData.login} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="password">Пароль:</label><br/>
                <input type="password" id="password" name="password" value={formData.password}
                       onChange={handleChange}/>
            </div>
            <br/>
            <button type="submit">Зарегистрироваться</button>
            <p><Link to="/log">Войти</Link></p>
        </form>
    );
};

export default RegistrationForm;

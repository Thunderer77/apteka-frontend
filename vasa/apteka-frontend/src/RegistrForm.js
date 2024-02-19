import React, {useState} from 'react';
import {useUser} from "./UserProvider";
import {Link, useNavigate} from "react-router-dom";

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
        setUser({...formData})
        console.log('Form submitted with data:', user);
        navigate('/profile');
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
                        <option value="male">Мужской</option>
                        <option value="female">Женский</option>
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

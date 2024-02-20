import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router";
import userEvent from "@testing-library/user-event";

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

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
const csrftoken = getCookie('csrftoken');
const withParams = Component => props => <Component {...props} params={useParams()}/>;

function UserUpdateForm(props) {
    const navigate = useNavigate();
    const {id} = props.params; // Получаем id из props.params
    const [item, setItem] = useState({
        name: '',
        s_name: '',
        birth: '',
        gender: '',
        login: '',
        password: '',
        role: 0,
        balance: 0
    });
    useEffect(() => {
        // Получаем данные пользователя при монтировании компонента
        axios.get(`http://127.0.0.1:8000/user/${id}/get`)
            .then(response => {
                console.log('User data:', response.data);
                setItem(response.data); // Устанавливаем полученные данные в состояние
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, [id]); // Монтируем useEffect при изменении id
    const handleChange = (e) => {
        const {name, value} = e.target;
        setItem({...item, [name]: value});
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        // Отправляем данные на сервер для обновления
        axios.put(`http://127.0.0.1:8000/user/${id}/`, item)
            .then(response => {
                navigate('/users'); // Переходим на страницу пользователей после обновления
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });
    };

    if (!item) return null; // Если данные еще не загружены, возвращаем null

    return (<form onSubmit={handleSubmit}>
            <div>
                <label>Имя:</label>
                <input type="text" name="name" value={item.name} onChange={handleChange}/>
            </div>
            <div>
                <label>Фамилия:</label>
                <input type="text" name="s_name" value={item.s_name} onChange={handleChange}/>
            </div>
            <div>
                <label>Дата рождения:</label>
                <input type="date" name="birth" value={item.birth} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="role">Роль:</label><br/>
                <select id="role" name="role" onChange={handleChange} value={item.role}>
                    <option value="1">Клиент</option>
                    <option value="0">Админ</option>
                </select>
            </div>
            <div>
                <label htmlFor="gender">Пол:</label><br/>
                <select id="gender" name="gender" onChange={handleChange} value={item.gender}>
                    <option value="Men">Мужской</option>
                    <option value="Woman">Женский</option>
                </select>
            </div>

            <div>
                <label>Логин:</label>
                <input type="text" name="login" value={item.login} onChange={handleChange}/>
            </div>
            <div>
                <label>Пароль:</label>
                <input type="password" name="password" value={item.password} onChange={handleChange}/>
            </div>
            <div>
                <label>Баланс:</label>
                <input type="number" name="balance" value={item.balance} onChange={handleChange}/>
            </div>
            <button type="submit" className='btn btn-primary mt-3'>Сохранить</button>
        </form>
    );
};

export default withParams(UserUpdateForm);

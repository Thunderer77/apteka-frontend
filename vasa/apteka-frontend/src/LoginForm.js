import React, { useState } from 'react';
import { useUser } from './UserProvider';

const LoginForm = () => {
  const { setUser } = useUser();
  const [loginData, setLoginData] = useState({ username: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь можете отправить запрос на сервер для проверки логина и пароля
    const { username, password } = loginData;
    if (username === 'correct_username' && password === 'correct_password') {
      // Если логин и пароль верные, устанавливаем пользователя в контексте
      setUser({ username });
    } else {
      alert('Неверный логин или пароль');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={loginData.username}
        onChange={handleInputChange}
        placeholder="Логин"
      />
      <input
        type="password"
        name="password"
        value={loginData.password}
        onChange={handleInputChange}
        placeholder="Пароль"
      />
      <button type="submit">Войти</button>
    </form>
  );
};

export default LoginForm;
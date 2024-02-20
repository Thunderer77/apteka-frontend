import React, {Component} from "react";
import {Link} from "react-router-dom";
import {useParams} from "react-router";
const withParams = Component => props => <Component {...props} params={useParams()}/>;

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isLoading: true,
            error: null
        };
    }

//https://thunderer77.pythonanywhere.com/
    componentDidMount() {
        fetch('http://127.0.0.1:8000/users/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                this.setState({data: data, isLoading: false});
            })
            .catch(error => {
                this.setState({error: error, isLoading: false});
            });
    }

    render() {
        const {data, isLoading, error} = this.state;

        // Обработка загрузки данных
        if (isLoading) {
            return <div>Loading...</div>;
        }

        // Обработка ошибки при загрузке данных
        if (error) {
            return <div>Error: {error.message}</div>;
        }

        // Рендеринг данных
        return (
            <div className="container">
                <h1>APTEKA</h1>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Имя</th>
                        <th>Фамилия</th>
                        <th>Дата Рождения</th>
                        <th>Пол (их только 2)</th>
                        <th>Логин</th>
                        <th>Пароль</th>
                        <th>Роль</th>
                        <th>Баланс</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            {Object.values(item).map((value, index) => {
                                if (index === 6) {
                                    return <td key={index}>{value.split('').map(c => '*')}</td>
                                } else if (index === 1) {
                                    return <td key={index}><Link to={`/user/${item.id}/get`}>{value}</Link>
                                    </td>
                                } else
                                    return <td key={index}>{value}</td>
                            })}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Users;
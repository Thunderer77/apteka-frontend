// Medicine.js
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Medicine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isLoading: true,
            error: null
        };
    }

    componentDidMount() {
        fetch('http://127.0.0.1:8000/meds/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                this.setState({ data: data, isLoading: false });
            })
            .catch(error => {
                this.setState({ error: error, isLoading: false });
            });
    }

    render() {
        const { data, isLoading, error } = this.state;

        if (isLoading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error.message}</div>;
        }

        return (
            <div className="container">
                <h1>Медикаменты</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Лекарство</th>
                            <th>Дозировка</th>
                            <th>Цена</th>
                            <th>Срок годности</th>
                            <th>Производитель</th>
                            <th>Эффект</th>
                            <th>Количество</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td><Link to={{ pathname: `/meds_el/${item.id}`, state: { id: item.id } }}>{item.med_n}</Link></td>
                                <td>{item.dose}</td>
                                <td>{item.price}</td>
                                <td>{item.until}</td>
                                <td>{item.dev}</td>
                                <td>{item.effect}</td>
                                <td>{item.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Medicine;

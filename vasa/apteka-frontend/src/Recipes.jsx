import {Component} from "react";

class Recipes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isLoading: true,
            isLoading2: true,
            isLoading3: true,
            pacients: null,
            meds: null,
            error: null
        };
    }

//https://thunderer77.pythonanywhere.com/
    componentDidMount() {
        fetch('http://127.0.0.1:8000/recipes/')
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
        fetch('http://127.0.0.1:8000/users/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                this.setState({pacients: data, isLoading2: false});
            })
            .catch(error => {
                this.setState({error: error, isLoading2: false});
            });
        fetch('http://127.0.0.1:8000/meds/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                this.setState({meds: data, isLoading3: false});
            })
            .catch(error => {
                this.setState({error: error, isLoading3: false});
            });
    }

    render() {
        const {data, pacients, isLoading, isLoading2, isLoading3, meds, error} = this.state;

        // Обработка загрузки данных
        if (isLoading || isLoading2 || isLoading3) {
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
                        <th>пациент</th>
                        <th>Лекарство</th>
                        <th>Дозировка</th>
                        <th>Дата выдачи</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            {Object.values(item).map((value, index) => {
                                if (index == 1) {
                                    return <td key={index}>
                                    {
                                            `${pacients[value - 1].name} ${pacients[value - 1].s_name}`
                                        }
                                    </td>
                                } else if (index == 2) {
                                    return <td key={index}> {value} </td>
                                } else return <td key={index}>{value}</td>
                            })}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Recipes;
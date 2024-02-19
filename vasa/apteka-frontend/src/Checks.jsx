import {Component} from "react";

class Checks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pacients: null,
            data: null,
            isLoading: true,
            isLoading2: true,
            error: null
        };
    }

//https://thunderer77.pythonanywhere.com/
    componentDidMount() {
        fetch('http://127.0.0.1:8000/checks/')
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
    }

    render() {
        const {data, pacients, isLoading, isLoading2, error} = this.state;

        // Обработка загрузки данных
        if (isLoading || isLoading2) {
            return <div>Loading...</div>;
        }

        // Обработка ошибки при загрузке данных
        if (error) {
            return <div>Error: {error.message}</div>;
        }

        // Рендеринг данных
        return (
            <div className="container">
                <h1>ЧЕКИ</h1>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Пациент</th>
                        <th>Сумма</th>
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

export default Checks;
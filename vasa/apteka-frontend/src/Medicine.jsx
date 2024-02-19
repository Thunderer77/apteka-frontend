import { Component } from "react";

class Medicine extends Component {
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
                        {Object.keys(data[0]).map(key => (
                            <th key={key}>{key}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            {Object.values(item).map((value, index) => (
                                <td key={index}>{value}</td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Medicine;
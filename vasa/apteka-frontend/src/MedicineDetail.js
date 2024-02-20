import React, {Component} from "react";
import {useParams} from "react-router";
import {Link} from "react-router-dom";

const withParams = Component => props => <Component {...props} params={useParams()}/>;

class MedicineDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isLoading: true,
            error: null,
            id: null
        };
    }

    componentDidMount() {
        const id = this.props.params.id; // Параметр маршрута передается как простая props
        fetch(`http://127.0.0.1:8000/meds`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                data = data.find(x => x.id === parseInt(id))
                this.setState({data: data, isLoading: false});
            })
            .catch(error => {
                this.setState({error: error, isLoading: false});
            });
    }

    render() {
        const {isLoading} = this.state;
        if (isLoading) {

            return <div>Loading...</div>;

        } else {

            const {med_n, dose, price, until, dev, effect, others, amount} = this.state.data;
            return <div className="container">
                <h1>Детали медикамента</h1>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{med_n}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Дозировка: {dose}</h6>
                        <p className="card-text">Цена: {price}</p>
                        <p className="card-text">Действительно до: {until}</p>
                        <p className="card-text">Производитель: {dev}</p>
                        <p className="card-text">Эффект: {effect}</p>
                        <p className="card-text">Другие аспекты: {others}</p>
                        <p className="card-text">Количество: {amount}</p>
                    </div>
                </div>

                <Link to="/meds" className="btn btn-primary mt-3">Купить</Link>
                <Link to="/meds" className="btn btn-primary mt-3">Назад к списку медикаментов</Link>
            </div>
        }
    }
}

export default withParams(MedicineDetail);

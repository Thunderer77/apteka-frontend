import {Component} from "react";

class ListBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isLoading: true,
            error: null
        }
    }

    componentDidMount() {
        fetch('https://thunderer77.pythonanywhere.com/')
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

    numbers() {
        let arraid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        return arraid
    }

    render() {
        return (<>
            {this.state.data+''}
        </>);
    }
}

export default ListBox
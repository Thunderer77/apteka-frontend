import './App.css';
import {Component} from "react";
import ListBox from "./ListBox";
import {Routes, Route} from "react-router-dom"
import {Layout} from "./Layout";

class App extends Component {
    render() {
        return (
            <>
                <Routes>
                    <Route path = '/' element={<Layout/>}>
                        <Route index element={<ListBox/>}/>
                        <Route path='someway' element={<ListBox/>}/>
                        <Route path='*' element={<ListBox/>}/>
                    </Route>
                </Routes>
            </>
        );
    }
}

export default App;

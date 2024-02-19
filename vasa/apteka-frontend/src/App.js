import './App.css';
import {Component} from "react";
import Users from "./Users";
import {Routes, Route} from "react-router-dom"
import {Layout} from "./Layout";
import Checks from "./Checks";
import Recipes from "./Recipes";
import Medicine from "./Medicine";

const MainPage=()=> {
    return <h1>WELCOME</h1>;
}

const Page404=()=> {
    return <div> <h1>Нет такой страницы</h1>
        <a href='/'>На главную</a></div>;
}

class App extends Component {
    render() {
        return (
            <>
                <Routes>
                    <Route path='/' element={<Layout/>}>
                        <Route index element={<MainPage/>}/>
                        <Route path='users' element={<Users/>}/>
                        <Route path='checks' element={<Checks/>}/>
                        <Route path='recipes' element={<Recipes/>}/>
                        <Route path='meds' element={<Medicine/>}/>
                        <Route path='*' element={<Page404/>}/>
                    </Route>
                </Routes>
            </>
        );
    }
}

export default App;

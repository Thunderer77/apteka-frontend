import './App.css';
import {Component} from "react";
import Users from "./Users";
import {Route, Routes} from "react-router-dom"
import {Layout} from "./Layout";
import Checks from "./Checks";
import Recipes from "./Recipes";
import Medicine from "./Medicine";
import MedicineDetail from "./MedicineDetail";
import {Page404} from "./Page404";
import {UserProvider} from "./UserProvider";
import LoginForm from "./LoginForm";

class App extends Component {
    render() {
        return (
            <>
                <Routes>
                    <Route path='/' element={<Layout/>}>
                        <Route index element={<LoginForm/>}/>
                        <Route path='users' element={<Users/>}/>
                        <Route path='users/:id' element={<UserProvider/>}/>
                        <Route path='checks' element={<Checks/>}/>
                        <Route path='recipes' element={<Recipes/>}/>
                        <Route path='meds' element={<Medicine/>}/>
                        <Route path='*' element={<Page404/>}/>
                        <Route path="meds_el/:id" element={<MedicineDetail/>}/>
                    </Route>
                </Routes>

            </>
        );
    }
}

export default App;

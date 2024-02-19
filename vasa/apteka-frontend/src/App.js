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
import Profile from "./Profile";
import RegisterForm from "./RegistrForm";
import Logout from "./Logout";

class App extends Component {
    render() {
        return (
            <>
                <UserProvider>
                    <Routes>
                        <Route path='/' element={<Layout/>}>
                            <Route index element={<Profile/>}/>
                            <Route path='users' element={<Users/>}/>
                            <Route path='profile' element={<Profile/>}/>
                            <Route path='logout' element={<Logout/>}/>
                            <Route path='log' element={<LoginForm/>}/>
                            <Route path='reg' element={<RegisterForm/>}/>
                            <Route path='checks' element={<Checks/>}/>
                            <Route path='recipes' element={<Recipes/>}/>
                            <Route path='meds' element={<Medicine/>}/>
                            <Route path='*' element={<Page404/>}/>
                            <Route path="meds_el/:id" element={<MedicineDetail/>}/>
                        </Route>
                    </Routes>
                </UserProvider>
            </>
        );
    }
}

export default App;

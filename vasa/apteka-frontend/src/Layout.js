import {Link, Outlet, useNavigate} from "react-router-dom"
import {useUser} from "./UserProvider";

const Layout = () => {
    const {user, setUser} = useUser();

    return (
        <>
            <header className='container p-3 pb-4 d-flex justify-content-around'>
                <Link to='/'>Главная</Link>
                {user?.role === 0 ?
                    (<><Link to='/users'>Пользователи</Link>
                    <Link to='/recipes'>Рецепты</Link>
                    <Link to='/checks'>Чеки</Link>
                    </>) : null
                }
                    <Link to='/meds'>Медикаменты</Link>
                <Link to='/logout'>Выход</Link>
            </header>
            <main className='container'>
                <Outlet/>
            </main>
        </>
    )
}
export {Layout}
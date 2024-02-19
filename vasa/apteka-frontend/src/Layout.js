import {Link, Outlet} from "react-router-dom"

const Layout = () => {
  return (
      <>
          <header className='container p-3 pb-4 d-flex justify-content-around'>
              <Link to='/'>Главная</Link>
              <Link to='/users'>Пользователи</Link>
              <Link to='/checks'>Чеки</Link>
              <Link to='/recipes'>Рецепты</Link>
              <Link to='/logout'>Выход</Link>
              <Link to='/meds'>Медикаменты</Link>
          </header>
          <main className='container'>
              <Outlet/>
          </main>
      </>
  )
}
export {Layout}
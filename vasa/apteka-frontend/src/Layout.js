import {Link, Outlet} from "react-router-dom"

const Layout = () => {
  return (
      <>
          <header className='container d-flex justify-content-around'>
              <Link to='/'>home</Link>
              <Link to='/users'>Users</Link>
              <Link to='/checks'>Checks</Link>
              <Link to='/recipes'>Recipes</Link>
              <Link to='/meds'>Medicine</Link>
          </header>
          <main className='container'>
              <Outlet/>
          </main>
      </>
  )
}
export {Layout}
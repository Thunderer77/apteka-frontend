import {Link, Outlet} from "react-router-dom"

const Layout = () => {
  return (
      <>
          <header className='container'>
              <Link to='/'>home</Link>
              <Link to='/someway'>home...</Link>
          </header>
          <main className='container'>
              <Outlet/>
          </main>
      </>
  )
}
export {Layout}
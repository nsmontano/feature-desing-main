import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
        <nav>
            <ul className='list'>
            <li><Link to="/" >Home</Link></li>
            <li><Link to="/cellphones" >Cellphones</Link></li>

        </ul>
        </nav>
        <section>
            <Outlet></Outlet>
        </section>
    </div>
  )
}

export default Layout



import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props => 
    <aside className='menu-area'>
        <nav className='menu'>
            {/* Refatorar para usar um componente menu. NavItem.jsx, por exemplo*/}
            <Link to='/'>
                <i className='fa fa-home'></i> Início
            </Link>
            <Link to='/users'>
                <i className='fa fa-users'></i> Usuários
            </Link>
        </nav>
    </aside>
import './Header.css'
import React from 'react'

export default props =>
    <header className='header d-none d-sm-flex flex-column'>
        {/*d-none = sem display quando for executado por celular.
           d-sm-flex = Se o componente for do tipo SM, vai usar o display flex. São pequenos, médios, grandes e extra grandes.
           flex-column = objetos organizados na vertical.*/}
        <h1 className="mt-3">
            <i className={`fa fa-${props.icon}`}></i>{/*fa é do font-awesome que eu importei lá no App.jsx*/}
            {props.title}
        </h1>
        <p className='lead text-muted'>{props.subtitle}</p>
    </header>


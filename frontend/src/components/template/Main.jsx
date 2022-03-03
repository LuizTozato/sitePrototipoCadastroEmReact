import './Main.css'
import React from 'react'
import Header from './Header'

export default props => 
    <React.Fragment>
        <Header {...props}/>
        <main className='content container-fluid'>
            <div className="p-3 mt-3">
                {/*mt-3 -> margin top = 3px. p-3 -> padding = 3px */}
                {props.children}
                {/*props.children é para colocar na tela aqui as tags que recebo via props*/}
            </div>
        </main>
    </React.Fragment>

import React from 'react'
import './header.css'

interface typesHeaderTodo {
    saveTodo: (value: React.KeyboardEvent<HTMLInputElement>) => void
}

export const Header: React.FC<typesHeaderTodo> = ({ saveTodo }) => {

    return (
        <div className='ContainerHeader'>
            <h1 className='TitleHeader'>Todo Ts</h1>
            <input
                className='InputHeader'
                type="text"
                onKeyDown={(event) => saveTodo(event)}
                placeholder='Escriba lo que necesite' />

        </div>

    )



}
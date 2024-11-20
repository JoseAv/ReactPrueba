import React from "react"
import { typeTodo, typesTodo } from '../../../types/todo'
import './Task.css'

interface typesTask extends typesTodo {
    deleteTodo: (id: string) => void
    saveUpdateTodo: (todo: typeTodo, value: React.KeyboardEvent<HTMLInputElement>) => void
    isEdit: (todo: typeTodo) => void
}

export const Task: React.FC<typesTask> = ({ dataTodo, deleteTodo, isEdit, saveUpdateTodo }) => {


    return (
        <div className="containerMain">
            {
                dataTodo.map((ele: typeTodo) => {
                    return (

                        <div key={ele.id} className="containerTask">
                            <div>
                                {ele.edit === true ? <input type="text" value={ele.nameTask} onKeyDown={(evn) => saveUpdateTodo(ele, evn)} /> : <p className="nameTask">{ele.nameTask}</p>}
                                <p className="idTask"><span className="spanCodeTask">Codigo</span>: {ele.id}</p>

                            </div>
                            <div className="containerButtonTask">
                                <button className="my-button red" onClick={() => deleteTodo(ele.id)}>Eliminar</button>
                                <button className="my-button " onClick={() => isEdit(ele)}>Editar</button>
                            </div>

                        </div>
                    )
                })
            }
        </div>

    )
}
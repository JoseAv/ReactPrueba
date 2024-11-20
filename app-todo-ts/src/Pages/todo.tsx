import React, { useState } from "react"
import { Footer } from "../components/todoComponents/Footer"
import { Header } from "../components/todoComponents/header/Header"
import { Task } from "../components/todoComponents/Task/Task"
import { typeTodo } from '../types/todo'
import { dataInitial } from '../types/initialData'

export const TodoApp = () => {
    const [dataTodo, setDataTodo] = useState<typeTodo[]>(dataInitial)

    const saveTodo = (value: React.KeyboardEvent<HTMLInputElement>): void => {
        if (value.key === "Enter") {
            const inputValue = value.currentTarget.value
            setDataTodo((prev) => [
                ...prev,
                { id: crypto.randomUUID(), nameTask: inputValue, edit: false }
            ])
            value.currentTarget.value = ''
        }
    };

    const deleteTodo = (id: string): void => {
        let newTodo = dataTodo
        newTodo = newTodo.filter((todo: typeTodo) => todo.id !== id)
        setDataTodo(newTodo)
    }

    const saveUpdateTodo = (todo: typeTodo, value: React.KeyboardEvent<HTMLInputElement>): void => {
        if (value.code === 'Enter') {
            const indexTodo = dataTodo.findIndex((ele: typeTodo) => ele.id === todo.id)
            const newTodo = [...dataTodo]
            newTodo[indexTodo].edit = false
            setDataTodo(newTodo)
        }
    }

    const isEdit = (todo: typeTodo): void => {
        const indexUpdateTodo = dataTodo.findIndex((ele: typeTodo) => ele.id === todo.id)
        const newTodo = [...dataTodo]
        newTodo[indexUpdateTodo].edit = true
        setDataTodo(newTodo)
    }


    return (
        <div className="ContainerMain">
            <div className="ContainerTodo">
                <Header saveTodo={saveTodo} />
                <Task
                    dataTodo={dataTodo}
                    deleteTodo={deleteTodo}
                    saveUpdateTodo={saveUpdateTodo}
                    isEdit={isEdit}
                />
                <Footer />
            </div>
        </div>


    )


}
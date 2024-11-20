import React, { useEffect, useState } from "react"
import { Footer } from "../components/todoComponents/Footer"
import { Header } from "../components/todoComponents/header/Header"
import { Task } from "../components/todoComponents/Task/Task"
import { typeTodo } from '../types/todo'
import { useInitialInformation } from "../components/hooks/initialInformation"

export const TodoApp = () => {
    const { tasks, loading, error } = useInitialInformation()
    const [dataTodo, setDataTodo] = useState<typeTodo[] | []>([])


    useEffect(() => {
        if (tasks.length && !loading) {
            setDataTodo(tasks)
        }
    }, [tasks, loading])

    const saveTodo = (value: React.KeyboardEvent<HTMLInputElement>): void => {
        if (value.key === "Enter") {
            const inputValue = value.currentTarget.value
            setDataTodo((prev) => [
                ...prev,
                { id: crypto.randomUUID(), nameTask: inputValue, edit: false, completed: false }
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

    const updateTodo = (evn: React.ChangeEvent<HTMLInputElement>, id: string) => {
        const newValue = evn.target.value
        const findTodo = dataTodo.findIndex((ele: typeTodo) => ele.id === id)
        const newTodo = [...dataTodo]
        newTodo[findTodo].nameTask = newValue
        setDataTodo(newTodo)
    }

    const isEdit = (todo: typeTodo): void => {
        const indexUpdateTodo = dataTodo.findIndex((ele: typeTodo) => ele.id === todo.id)
        const newTodo = [...dataTodo]

        newTodo[indexUpdateTodo].edit = !newTodo[indexUpdateTodo].edit
        setDataTodo(newTodo)
    }

    if (loading) return <p>...Cargando</p>
    if (error) return <p>Ah ocuirrdo un error intentelo nuevamente</p>


    return (
        <div className="ContainerMain">
            <div className="ContainerTodo">
                <Header saveTodo={saveTodo} />
                <Task
                    dataTodo={dataTodo}
                    deleteTodo={deleteTodo}
                    saveUpdateTodo={saveUpdateTodo}
                    isEdit={isEdit}
                    updateTodo={updateTodo}
                />
                <Footer />
            </div>
        </div>


    )


}



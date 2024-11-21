import React, { useEffect, useState } from "react"
import { Footer } from "../components/todoComponents/footer/Footer"
import { Header } from "../components/todoComponents/header/Header"
import { Task } from "../components/todoComponents/Task/Task"
import { TypesFiltes, typeTodo } from '../types/todo'
import { useInitialInformation } from "../components/hooks/initialInformation"
import { FilterButton } from '../types/initialData'

export const TodoApp = () => {
    const { tasks, loading, error } = useInitialInformation()
    const [dataTodo, setDataTodo] = useState<typeTodo[] | []>([])
    const [showTodo, setShowTodo] = useState<typeTodo[] | []>([])
    const [filters, setFilters] = useState<TypesFiltes>('All')



    useEffect(() => {
        if (tasks.length && !loading) {
            setDataTodo(tasks)
            setShowTodo(tasks)
        }
    }, [tasks, loading])

    useEffect(() => {
        filtersChange(filters)
    }, [dataTodo])


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

    const completedTodo = (todo: typeTodo): void => {
        const newDataTodo = dataTodo.map((ele: typeTodo) => {
            if (ele.id === todo.id) {
                ele.completed = !ele.completed
            }
            return ele
        })
        setDataTodo(newDataTodo)
    }

    const filtersChange = (fil: string) => {
        if (fil === FilterButton.all) {
            setFilters(FilterButton.all)
            setShowTodo([...dataTodo])
        }

        if (fil === FilterButton.completed) {
            setFilters(FilterButton.completed)
            const newTodo = [...dataTodo].map((ele: typeTodo) => {
                ele.completed = true
                return ele
            })
            setShowTodo(newTodo)
        }

        if (fil === FilterButton.deleted) {
            setFilters(FilterButton.deleted)
            const newTodo = [...dataTodo].filter((ele: typeTodo) => ele.completed !== true)
            setShowTodo(newTodo)
        }

    }

    if (loading) return <p>...Cargando</p>
    if (error) return <p>Ah ocuirrdo un error intentelo nuevamente</p>


    return (

        <div className="ContainerMain">
            <div className="ContainerTodo">
                <Header saveTodo={saveTodo} />
                {
                    dataTodo.length ?
                        <>
                            <Task
                                dataTodo={showTodo}
                                deleteTodo={deleteTodo}
                                saveUpdateTodo={saveUpdateTodo}
                                isEdit={isEdit}
                                updateTodo={updateTodo}
                                completedTodo={completedTodo}
                            />
                            <Footer filtersChange={filtersChange} />
                        </>
                        : <p>Todas las tareas completadas</p>
                }



            </div>
        </div>


    )


}



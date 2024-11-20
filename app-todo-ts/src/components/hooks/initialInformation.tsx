import { useEffect, useState } from "react"
import { dataInitial } from '../../types/initialData'
import { typeTodo } from '../../types/todo'

export const useInitialInformation = () => {
    const [tasks, setTask] = useState<typeTodo[] | []>([])
    const [loading, setLoadind] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const handleInitialData = async () => {
            try {
                const newDataInitial = [...dataInitial].map((ele) => {
                    return {
                        ...ele,
                        edit: false
                    }
                })
                setTask(newDataInitial)

            } catch (err: unknown) {

                if (err instanceof Error) {
                    setError(err.message)
                } else {
                    setError(String(err))
                }

            } finally {
                setLoadind(false)
            }
        }
        handleInitialData();

    }, [])

    return { tasks, loading, error }



}